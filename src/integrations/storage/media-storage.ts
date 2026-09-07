import { getEnvConfig } from '@/config/env';

export type MediaUploadRequest = {
  file: File;
  purpose: 'post-image' | 'post-video' | 'project-avatar' | 'user-avatar';
};

export type MediaUploadResult = {
  key: string;
  publicUrl: string;
};

export type MediaStorage = {
  getPublicUrl: (key: string) => string | null;
  upload: (request: MediaUploadRequest) => Promise<MediaUploadResult>;
};

class UnconfiguredMediaStorage implements MediaStorage {
  getPublicUrl(): string | null {
    return null;
  }

  async upload(): Promise<MediaUploadResult> {
    throw new Error(
      'Media uploads are not configured. Set VITE_MEDIA_PUBLIC_BASE_URL and VITE_MEDIA_UPLOAD_API_URL.',
    );
  }
}

/**
 * Browser-side media storage boundary.
 *
 * User media is stored in Cloudflare R2 (or compatible object storage). The browser
 * must never receive object-storage credentials. Uploads require a server-side signing
 * endpoint (implementation TBD) that returns short-lived upload URLs or accepts
 * authenticated multipart uploads on behalf of the client.
 */
export function createMediaStorage(): MediaStorage {
  const env = getEnvConfig();

  if (!env.isMediaConfigured) {
    return new UnconfiguredMediaStorage();
  }

  const publicBaseUrl = env.mediaPublicBaseUrl!;

  return {
    getPublicUrl(key: string) {
      const normalizedBase = publicBaseUrl.replace(/\/$/, '');
      const normalizedKey = key.replace(/^\//, '');
      return `${normalizedBase}/${normalizedKey}`;
    },

    async upload(request: MediaUploadRequest) {
      if (!env.mediaUploadApiUrl) {
        throw new Error(
          'VITE_MEDIA_UPLOAD_API_URL is required for uploads. The signing endpoint is not yet implemented.',
        );
      }

      const response = await fetch(env.mediaUploadApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: request.file.name,
          contentType: request.file.type,
          size: request.file.size,
          purpose: request.purpose,
        }),
      });

      if (!response.ok) {
        throw new Error(`Media upload signing failed (${response.status}).`);
      }

      // Placeholder response shape until the server-side signer exists.
      const payload = (await response.json()) as {
        uploadUrl: string;
        key: string;
        publicUrl: string;
      };

      const uploadResponse = await fetch(payload.uploadUrl, {
        method: 'PUT',
        body: request.file,
        headers: { 'Content-Type': request.file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Media upload failed (${uploadResponse.status}).`);
      }

      return { key: payload.key, publicUrl: payload.publicUrl };
    },
  };
}
