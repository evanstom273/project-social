---
colors:
  accent-rose: "#FF8FA3"
  accent-warm: "#FFB86B"
  background: "#0B0D10"
  border-default: rgba(194, 203, 214, 0.16)
  border-focus: rgba(94, 224, 181, 0.70)
  border-strong: rgba(194, 203, 214, 0.26)
  border-subtle: rgba(194, 203, 214, 0.10)
  error: "#FF7B7B"
  on-primary: "#062219"
  on-surface: "#F4F7FA"
  primary: "#5EE0B5"
  primary-hover: "#74E7C1"
  primary-muted: rgba(94, 224, 181, 0.14)
  project-accent-default: "#8EB7FF"
  scrim: rgba(5, 7, 10, 0.76)
  secondary: "#8EB7FF"
  secondary-muted: rgba(142, 183, 255, 0.14)
  success: "#5EE0B5"
  surface: "#111419"
  surface-hover: "#252C37"
  surface-overlay: "#202630"
  surface-raised: "#1A1F27"
  surface-subtle: "#151920"
  text-faint: "#66717E"
  text-muted: "#8793A1"
  text-primary: "#F4F7FA"
  text-secondary: "#C2CBD6"
  warning: "#F5C76B"
motion:
  deliberate: 260ms
  fast: 120ms
  standard: 180ms
name: Project Social Design System
rounded:
  DEFAULT: 0.75rem
  full: 9999px
  lg: 1rem
  md: 0.875rem
  sm: 0.5rem
  xl: 1.25rem
  xs: 0.375rem
spacing:
  content-max: 80rem
  feed-max: 42rem
  gutter-desktop: 1.5rem
  gutter-mobile: 0.875rem
  gutter-tablet: 1.25rem
  space-2xl: 3rem
  space-2xs: 0.25rem
  space-3xl: 4rem
  space-lg: 1.5rem
  space-md: 1rem
  space-sm: 0.75rem
  space-xl: 2rem
  space-xs: 0.5rem
typography:
  body-lg:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: 400
    letterSpacing: "-0.005em"
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 400
    letterSpacing: 0
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 400
    letterSpacing: 0
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    letterSpacing: 0.005em
    lineHeight: 1.4
  display-lg:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 750
    letterSpacing: "-0.035em"
    lineHeight: 1.08
  display-sm:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 700
    letterSpacing: "-0.03em"
    lineHeight: 1.12
  headline-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 700
    letterSpacing: "-0.025em"
    lineHeight: 1.2
  headline-md:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 650
    letterSpacing: "-0.018em"
    lineHeight: 1.3
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 650
    letterSpacing: "-0.012em"
    lineHeight: 1.35
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
    letterSpacing: 0.005em
    lineHeight: 1.2
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 650
    letterSpacing: 0.025em
    lineHeight: 1.2
---

# Brand & Style

Project Social is a visual, project-centred social network for
discovering, following and sharing things while they are being made. Its
interface should feel like a lively creative workshop rather than a
corporate productivity suite, a polished portfolio site, or an
engagement-optimised social feed.

The product is built around three equally important identities:
**people, projects, and communities**. Projects are first-class objects,
not decorative tags attached to creator posts. The design must therefore
make it immediately obvious both **who made something** and **what they
are making**.

The aesthetic combines **editorial clarity**, **creative-tool
precision**, and **social warmth**. Dark neutral surfaces give
screenshots, artwork, game footage, renders, photography and other user
media room to dominate. Fresh mint is the principal product accent, with
cool blue and restrained warm accents providing enough variety to
prevent the application feeling monochromatic.

The interface should feel calm without feeling empty, modern without
looking sterile, and distinctive without competing with the work being
shared.

Avoid: - excessive glassmorphism; - large decorative gradients behind
ordinary content; - neon cyberpunk styling; - dense dashboard-like
chrome; - engagement bait; - oversized metrics; - generic "AI startup"
visual language; - making creator identity visually overpower project
identity; - excessive card nesting; - algorithmic-looking recommendation
labels such as "For You".

# Product Principles Expressed Through Design

## Projects Matter as Much as Profiles

Every project-associated post should expose project identity clearly and
consistently. A viewer should be able to move from an individual update
to the full history of the thing being made with one obvious
interaction.

Creator attribution remains visible, but the hierarchy should normally
read:

**Project → update → creator**

rather than:

**Creator → post → project tag**

## The Feed Is Legible, Not Manipulative

The default feed is chronological. The UI should reinforce that fact
rather than imitate opaque recommendation feeds.

"Everything", "Following", community filters, media filters, and
explicit ranking modes such as "Top Today" are user-selected controls.
The interface should make the active sorting/filter state obvious.

Do not use visual tricks that imply unseen personalisation.

## Media Gets the Stage

Posts may contain text, screenshots, image galleries, GIF-like loops, or
videos up to 60 seconds. Media should receive generous width and minimal
framing. The surrounding interface should support the work rather than
decorate over it.

## Small Updates Are Valid

A post does not need to look like a polished launch announcement. The
interface should make a sentence plus one screenshot feel complete and
worth posting. Avoid layouts that implicitly reward long captions,
elaborate thumbnails, or marketing copy.

## Browsing Is for Spectators Too

The application is not only a tool for makers. Browsing should feel
entertaining even when the viewer has never created a project. Project
context must be understandable without requiring insider knowledge of
the craft.

# Colors

The palette is dark-first and deliberately neutral around user-generated
media.

-   **Background (`#0B0D10`)**: The application canvas.
-   **Surface (`#111419`)**: Standard feed and navigation surfaces.
-   **Surface Raised (`#1A1F27`)**: Cards, menus and controls that need
    separation.
-   **Primary (`#5EE0B5`)**: Fresh mint. Used for selected states,
    primary actions, follow states, focus rings and meaningful progress.
-   **Secondary (`#8EB7FF`)**: Cool blue. Used sparingly for project
    identity, links and secondary information.
-   **Accent Warm (`#FFB86B`)**: Optional warm highlight for milestones,
    releases and celebratory states.
-   **Text Primary (`#F4F7FA`)**: High-priority text.
-   **Text Secondary (`#C2CBD6`)**: Supporting copy.
-   **Text Muted (`#8793A1`)**: Metadata, timestamps and low-priority
    controls.
-   **Border Subtle (`rgba(194, 203, 214, 0.10)`)**: Default structural
    separation.

User-created project accent colours may appear in tightly controlled
locations such as project avatars, thin identity strips, badges, or
timeline markers. They should not recolour entire cards or compromise
text contrast.

# Typography

Use **Inter** as the default interface family. The typography should
feel direct and contemporary, with slightly tighter headings and relaxed
body copy.

-   **Display**: Reserved for landing, onboarding and major project
    titles. Never use display-scale text inside the ordinary feed.
-   **Headlines**: Used for page headings, project names and major
    sections.
-   **Body**: Used for post copy, descriptions, comments and explanatory
    UI.
-   **Labels**: Used for buttons, filter controls, community badges and
    metadata.
-   **Captions**: Used for timestamps, media details and tertiary
    information.

Post text should remain comfortable to read without visually competing
with attached media. Avoid ultra-light font weights.

# Layout & Spacing

The application is **mobile-first**.

## Mobile (\< 768px)

Use a single-column feed occupying the available viewport width. Keep
gutters compact so media does not become unnecessarily narrow. Primary
navigation should live in a fixed or sticky bottom bar. The feed header
and active filter controls may remain sticky when useful.

Post media may visually extend closer to the viewport edge than post
text, particularly for image and video content.

## Tablet (768px--1024px)

Use a centred feed with optional supporting navigation. Secondary
discovery or project context may appear in drawers or adjacent panels
when space allows.

## Desktop (\> 1024px)

Use a three-zone shell:

-   left navigation rail;
-   centred primary feed capped at approximately `42rem`;
-   optional right discovery/context rail.

The overall application is bounded by `content-max` (`80rem`). Side
rails should never squeeze the feed below a comfortable reading/media
width.

The desktop layout should feel like a social application, not an
analytics dashboard.

# Elevation & Depth

Depth is primarily tonal.

-   **Level 0 --- Canvas**: `#0B0D10`.
-   **Level 1 --- Feed/Navigation Surface**: `#111419`.
-   **Level 2 --- Raised Controls/Cards**: `#1A1F27` with a subtle
    border.
-   **Level 3 --- Menus/Popovers**: `#202630`, subtle border and soft
    shadow.
-   **Level 4 --- Modals**: `#202630` over `scrim`.

Avoid persistent heavy shadows around feed posts. On mobile, posts may
be separated primarily by spacing or subtle dividers rather than looking
like floating dashboard widgets.

# Shapes

Roundedness should be friendly but restrained.

-   **Compact controls**: `0.5rem`.
-   **Inputs and buttons**: `0.75rem`.
-   **Cards and media containers**: `0.875rem` to `1rem`.
-   **Large sheets and modals**: `1.25rem`.
-   **Avatars, chips and compact filter pills**: full radius where
    appropriate.

Do not make every object pill-shaped.

# Motion

Motion should communicate state, not provide spectacle.

-   Hover/focus transitions: `120ms`.
-   Standard state changes: `180ms`.
-   Drawers, sheets and larger transitions: `260ms`.

Likes, saves and follows may use a small scale or opacity response, but
avoid explosive confetti or exaggerated engagement animation.

Respect `prefers-reduced-motion`.

# Components

## Application Shell

### Desktop Navigation Rail

Contains: - product mark/name; - Home; - Explore; - Communities; -
Projects; - Saved; - profile/account entry; - prominent Create/Post
action.

The active destination uses the primary mint accent without turning the
entire row into a bright block.

### Mobile Bottom Navigation

Keep to approximately five high-value destinations. Suggested initial
structure: - Home; - Explore; - Create; - Projects; - Profile.

The central Create action may receive slightly stronger emphasis.

## Feed Header

The feed header communicates both location and ordering.

Primary feed controls: - **Everything** - **Following**

Secondary filters may include: - Communities; - Projects; - Media type.

Explicit ranking controls such as **Newest**, **Top Today**, **Top This
Week**, or **Most Discussed** should live behind a clearly labelled sort
control. `Newest` is the default for the main public feed.

Never label the default feed "For You".

## Post Card

The post card is the core component.

### Header

Show: - project avatar/icon; - project name; - creator avatar; - creator
name/handle; - timestamp; - community context when relevant; - overflow
menu.

Project identity should be visually primary when the post belongs to a
project. Creator identity should remain easy to find but slightly
quieter.

A projectless personal post may invert this hierarchy.

### Body

Contains optional post text followed by media. Short updates should not
be padded into oversized cards.

Links in post text use the secondary blue accent. Hashtags/tags, if
supported, should be visually quieter than project identity.

### Media

Support: - single image; - image gallery; - short video up to 60
seconds; - animated/looping media.

Media uses a neutral dark placeholder while loading. Preserve aspect
ratio and avoid unnecessary cropping. Galleries should clearly indicate
additional items.

Video controls should be minimal and familiar. Do not autoplay with
sound. Duration should be visible before playback where practical.

### Actions

Primary actions: - Like; - Comment; - Save; - Share.

Counts should be readable but visually secondary. Saving is semantically
distinct from liking.

Do not make raw engagement numbers the loudest element in the card.

## Project Identity Badge

A compact reusable component containing: - project avatar/icon; -
project name; - optional project category; - optional accent colour.

It links directly to the project page.

This component appears in feed cards, search results, creator profiles,
community posts and notifications.

## Project Page

The project page is one of the defining surfaces of the product.

### Hero

Show: - project name; - project artwork/avatar; - short description; -
creator(s); - category/community associations; - follower count; -
Follow Project action; - optional external actions such as Website,
Source, Play, Download, Buy or Support.

External actions are links; the platform does not need to process
transactions initially.

### Project Navigation

Suggested tabs: - Updates; - Timeline; - About; - Media.

### Updates

A chronological feed containing only posts attached to the project.

### Timeline

A visual history of the project from early work through milestones,
redesigns, demos and releases.

Timeline entries should feel connected but not like formal
project-management tasks. They are a scrapbook/history of the thing
being made.

Milestones may use the warm accent and a slightly stronger marker.

## Creator Profile

Profiles should behave more like a creator's shelf than a conventional
influencer page.

Show: - avatar; - display name and handle; - short bio; - Follow
Creator; - project grid/shelf; - recent posts.

Projects should occupy substantial visual space. Follower/following
counts remain available but should not dominate the header.

## Project Shelf / Grid

Used on profiles, Explore and project discovery.

Each tile may contain: - project artwork; - project name; - creator; -
category; - short status or latest-update preview; - follow state.

Prefer visual artwork and clear project identity over metric-heavy
cards.

## Community Page

Communities organise work around subjects or crafts rather than
replacing projects.

Examples might include: - Godot; - Blender; - Minecraft Builds; -
Woodworking; - Indie Music; - Writing.

Community pages contain: - name and description; - Join/Follow
Community; - chronological posts by default; - explicit sort/filter
controls; - featured or pinned information where moderation requires it.

A post can belong to a project and also appear in one or more relevant
communities.

## Composer

The composer must make lightweight posting feel natural.

Core fields: - text; - attach image/gallery/video; - attach/select
project; - share to community; - publish.

Project selection should be prominent but not mandatory for every
possible post.

For video uploads, communicate the current **60-second maximum** before
upload rather than only showing an error afterwards.

Drafts should survive accidental refreshes or temporary connectivity
loss when local persistence is available.

Avoid turning the composer into a multi-step publishing wizard.

## Buttons

### Primary

Mint background (`#5EE0B5`), dark text (`#062219`), medium weight. Used
for Create, Publish, Follow and other high-value actions.

Hover shifts subtly brighter. Focus uses `border-focus`.

### Secondary

Raised neutral surface with a subtle border and primary text. Used for
secondary actions and neutral confirmations.

### Ghost

Transparent background with muted text/icon. Hover introduces
`surface-hover`.

### Destructive

Use `error` carefully and only for genuinely destructive actions.

## Inputs

Inputs use `surface-raised` or `surface-subtle`, a subtle border and
clear text.

Focus: - border shifts to primary; - soft 2px primary-muted ring; - no
aggressive glow.

Search should feel lightweight and can use a rounded compact field in
navigation contexts.

## Chips & Filters

Use compact pills for: - active filters; - community labels; - project
categories; - media types.

Inactive chips use neutral surfaces. Active chips use `primary-muted`
with primary text/border.

Do not use chips for every piece of metadata.

## Avatars

People and projects must be distinguishable at a glance.

Suggested convention: - **People**: circular avatars. - **Projects**:
rounded-square avatars/icons.

This distinction should remain consistent across feed cards, search,
notifications and profiles.

## Likes

An inactive like is neutral. Active like may use `accent-rose` or
primary depending on the final icon language.

A like is appreciation. It must not silently alter the user's
chronological home-feed ordering.

## Saves

Use a bookmark-style control. Saved state should be clear but quiet.

Saving means "I want to find this again." It is not public endorsement
by default.

Future collections may allow users to organise saves privately.

## Follow Controls

The interface must distinguish: - Follow Creator; - Follow Project; -
Follow/Join Community.

Never collapse these into one ambiguous "Follow" relationship when
context is unclear.

## Empty States

Empty states should encourage exploration without pretending content
exists.

Examples: - no followed projects yet → suggest browsing projects or
communities; - no saved posts → explain what Save does; - new project
with no updates → encourage its creator to post the first update.

Keep empty-state language human and concise.

## Loading States

Use skeletons shaped like real content. Avoid full-screen spinners for
ordinary feed loading.

Media placeholders should preserve expected aspect ratio to prevent
layout shift.

## Notifications

Notifications should make the object of the event explicit: - a person
interacted with your update; - a followed project posted an update; -
activity occurred in a community; - someone followed your project or
creator profile.

Project notifications should show the project rounded-square identity
alongside the relevant person where useful.

# Feed Behaviour

The main public feed is chronological: newest public post first.

The interface may offer explicit filters and explicit ranked views, but
interaction with posts must not silently re-rank the default feed.

Allowed user-selected views include: - Everything; - Following; -
individual communities; - individual projects; - media type filters; -
Newest; - Top Today; - Top This Week; - Top This Month; - Most
Discussed.

A new creator's public post enters the same chronological Everything
feed as a large creator's post.

The product does not promise equal audiences. It does promise that the
default public feed does not require an opaque recommendation system's
permission for a post to appear.

# Discovery

Explore should support intentional wandering rather than only
prediction.

Useful discovery surfaces may include: - newest projects; - recently
updated projects; - active communities; - top posts for an explicitly
selected period; - random or shuffled project discovery; - search; -
categories/crafts; - milestone/release posts.

Discovery can use ranking where the user explicitly asks for ranking. It
should not mutate the chronological home feed based on inferred
interest.

# Responsive Behaviour

## Feed Cards

On mobile: - reduce outer card chrome; - allow media to use nearly the
full viewport width; - keep actions comfortably tappable; - collapse
secondary metadata before primary identity.

On desktop: - preserve the same content hierarchy; - do not add
complexity merely because space exists.

## Side Rails

Desktop side rails may surface navigation, active communities, saved
filters, or discovery links. They should not become algorithmic
"recommended because you watched..." panels.

## Drawers & Sheets

On mobile, filters, project selection, sharing and secondary navigation
may use bottom sheets or full-height drawers.

# Accessibility

-   Maintain WCAG AA contrast for ordinary text and controls.
-   All interactive controls require visible keyboard focus.
-   Never rely on colour alone to distinguish followed, liked, saved or
    selected state.
-   Provide text alternatives for user media where supported.
-   Respect reduced motion.
-   Buttons and icon-only controls require accessible labels.
-   Mobile touch targets should generally be at least 44×44px.
-   Video requires accessible playback controls and should not autoplay
    with sound.
-   Preserve semantic heading order across project pages, profiles and
    communities.

# Implementation Guidance

The design tokens in this file should become the shared vocabulary of
the application rather than being copied as arbitrary one-off values.

For the React/Tailwind implementation: - expose core colours and spacing
as CSS custom properties or Tailwind theme tokens; - build reusable
primitives for Button, Avatar, ProjectAvatar, Chip, Input and
Modal/Sheet; - build domain components such as PostCard, ProjectBadge,
ProjectTile, FeedControls and Composer from those primitives; - keep
feed data separate from presentation components; - design mobile
behaviour at the same time as desktop behaviour; - avoid introducing a
heavyweight component library unless it solves a demonstrated problem.

The first UI prototype should use realistic dummy content across several
kinds of projects so the design is tested against the actual breadth of
the platform rather than only indie game development.

Representative dummy content should include a mixture such as: - an
indie game combat clip; - a Blender character render; - a Minecraft
build; - a software/tool interface; - a novel or writing project; - a
woodworking/restoration project; - an independent music recording; - an
electronics or Raspberry Pi build.

# Initial Feed Prototype

The first implementation target is the main feed, not authentication or
backend infrastructure.

It should demonstrate: - the application shell; - Everything / Following
controls; - explicit chronological ordering; - several realistic
PostCard variants; - strong project identity; - creator attribution; -
image/gallery/video presentation; - community context; -
like/comment/save/share controls; - responsive mobile and desktop
layouts.

Interactions may use local state for the prototype. Backend
authentication, Supabase persistence, R2 uploads and realtime behaviour
are deliberately outside the first visual pass.

The prototype succeeds when opening it feels like entering a real social
network for discovering things people are making, rather than viewing a
component demo or admin dashboard.
