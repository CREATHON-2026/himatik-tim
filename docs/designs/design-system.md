# Creatons UI/UX Design System Direction: Modern Editorial Creative

**Tanggal:** 01 September 2026\
**Versi:** 1.0\
**Status:** Design Direction / Foundation

## 1. Pendahuluan

Dokumen ini menjadi panduan strategis dan operasional untuk membangun
UI/UX Creatons yang konsisten, elegan, mudah digunakan, dan realistis
untuk diimplementasikan sebagai web application.

Creatons adalah platform yang mempertemukan **creator, client, ide, dan
percakapan**. Karena itu, desain tidak diarahkan menjadi marketplace
yang terlalu dekoratif maupun SaaS yang terlalu generik. Arah visualnya
adalah **Modern Editorial Creative**: perpaduan tipografi editorial,
interface modern, whitespace yang luas, serta dekorasi yang halus dan
terkontrol.

> **Creativity first, clarity always.**

Desain harus terasa kreatif tanpa mengorbankan usability.

## 2. Tema & Brand Feeling

**Tema:** Modern Editorial Creative Platform

**Brand Feeling:**\
"Tempat kreativitas berubah menjadi percakapan dan hasil nyata."

Visual harus terasa: - Creative - Editorial - Premium - Human -
Trustworthy - Calm - Modern - Approachable

## 3. Art Direction: Modern Editorial Creative

Karakter visual Creatons dibangun terutama melalui **typography,
spacing, composition, image treatment, dan violet brand accents**.

Prinsip: 1. **Editorial Typography** --- serif untuk headline/branding,
sans-serif untuk UI dan informasi. 2. **Generous Whitespace** --- ruang
kosong untuk kesan tenang dan premium. 3. **Soft Framing** --- border
tipis, radius moderat, dan elevation ringan. 4. **Subtle Ornament** ---
spark/star Creatons, garis editorial, atau pola abstrak sebagai aksen.
5. **Human Imagery** --- creator, studio, portfolio, dan proses
berkarya. 6. **Functional Decoration** --- dekorasi tidak boleh
mengganggu interaksi.

## 4. Color System

### Neutral

-   Neutral 50 --- `#FAFAF9` --- page background
-   Neutral 100 --- `#F5F5F4` --- soft section
-   Neutral 200 --- `#E7E5E4` --- border
-   Neutral 300 --- `#D6D3D1` --- divider/disabled
-   Neutral 400 --- `#A8A29E` --- placeholder
-   Neutral 500 --- `#78716C` --- secondary text
-   Neutral 700 --- `#292524` --- strong text
-   Neutral 900 --- `#111827` --- primary text

### Primary --- Violet

-   Violet 50 --- `#F5F3FF`
-   Violet 100 --- `#EDE9FE`
-   Violet 200 --- `#DDD6FE`
-   Violet 300 --- `#C4B5FD`
-   Violet 400 --- `#8B7CF6`
-   Violet 500 --- `#6355D9` --- primary action
-   Violet 600 --- `#5145C6` --- hover
-   Violet 700 --- `#4338A8` --- active
-   Violet 900 --- `#28206B` --- deep accent

### Accent

-   Coral --- `#E76F61` --- restrained highlight/accent
-   AI Lavender --- `#8B7CF6` --- AI-related UI

**Rules:** Violet menjadi warna utama untuk action; Coral hanya aksen;
Lavender membedakan AI; Neutral mendominasi surface. Gradient hanya
digunakan secara selektif pada branding/hero.

## 5. Typography

Gunakan kombinasi **editorial serif + modern sans-serif**.

**Serif:** logo, display heading, page hero, editorial statement.\
**Sans-serif:** body, label, input, button, navigation, metadata.

### Type Scale

  Style            Desktop      Mobile
  ------------ ----------- -----------
  Display         60 / 1.1   40 / 1.15
  H1             48 / 1.15    36 / 1.2
  H2              36 / 1.2    30 / 1.2
  H3             28 / 1.25    24 / 1.3
  H4              22 / 1.3    20 / 1.3
  Body Large      18 / 1.5    17 / 1.5
  Body            16 / 1.5    16 / 1.5
  Small           14 / 1.4    14 / 1.4
  Caption         12 / 1.4    12 / 1.4

## 6. Spacing, Radius & Elevation

### Spacing

Gunakan sistem 8pt: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`

### Radius

-   4px --- small controls
-   8px --- compact components
-   **12px --- primary components**
-   16px --- cards/containers
-   20--24px --- special large visual containers

### Elevation

Gunakan soft elevation dari flat surface sampai modal/dialog. Hindari
hard black shadows.

## 7. Grid & Responsive Layout

-   **Mobile:** 4 columns, 16px margin, 16px gutter
-   **Tablet:** 8 columns, 24px margin, 24px gutter
-   **Desktop:** 12 columns, 32px margin, 24--32px gutter

Mobile-first menjadi dasar. Authentication pages dapat memakai
**two-panel horizontal composition** pada desktop dan berubah menjadi
single-column pada mobile.

## 8. Component Architecture

### Foundation Components

Button, Input Field, Textarea, Select, Checkbox, Radio, Switch, Badge,
Chip/Filter, Avatar, Rating, Divider, Tooltip, Icon, Loading.

### Composite Components

Search Bar, Creator Card, Portfolio Card, Profile Header, Chat Message,
Chat Composer, Filter Bar, Modal, Dropdown, Navigation, Empty State,
Authentication Form, AI Brief Panel, AI Suggestion Card.

### Product-Specific Components

Creator Discovery, Creator Portfolio, Conversation/Chat, AI Order Brief,
Brief Confirmation, Creator Service Card, Project Summary, AI
Evidence/Source panel.

## 9. Component Behavior

### Button

Primary action menggunakan violet. States: Default, Hover, Pressed,
Focus, Disabled, Loading.

### Input

Border neutral dengan focus violet. States: Default, Hover, Focus,
Filled, Error, Success, Disabled. Error harus memiliki pesan tekstual.

### Cards

Gunakan card untuk grouping informasi, bukan setiap elemen. Surface
putih/soft neutral, border tipis, radius 12--16px, dan soft elevation
bila diperlukan.

### Chat

Chat adalah bagian penting dari identitas Creatons. User/creator message
harus jelas; AI assistance menggunakan lavender surface dan spark motif;
metadata dibuat muted.

## 10. AI Design Language

AI tidak boleh mengambil alih interface.

### AI States

-   **Extracted** --- informasi berhasil diambil.
-   **Missing** --- informasi belum tersedia.
-   **Suggested** --- AI memberikan saran.
-   **Confirmed** --- informasi telah dikonfirmasi.

AI dapat menggunakan lavender accent, spark/star icon, soft lavender
background, dan evidence/source indicator.

> **AI should clarify, not create uncertainty.**

## 11. Authentication Design

Login dan Register menggunakan **editorial split layout** pada desktop:

`[ CREATIVE / BRAND VISUAL ] | [ AUTHENTICATION FORM ]`

Karakter: - Wide horizontal container - Dua panel seimbang - Warm
neutral surface - Thin border - 16--20px outer radius - Subtle
decorative line art - Violet primary CTA

Pada mobile, form menjadi prioritas dan visual dipadatkan atau
disembunyikan.

## 12. Illustration & Photography

### Photography

Natural light, creative workspace, creator at work, portfolio/art
objects, warm neutral tone, dan authentic rather than stock-looking.

### Illustration

Minimal line art, abstract organic forms, violet/lavender accent, thin
stroke, low contrast.

## 13. Decorative Language

Dekorasi adalah supporting layer.

Elemen: - Creatons spark/star - Thin editorial lines - Minimal abstract
botanical curves - Small dot grids - Fine corner ornaments - Soft
lavender patterns

Dekorasi harus low contrast, tidak menutupi content, dan lebih banyak
digunakan pada authentication, onboarding, hero, empty states, dan
branding area.

## 14. Motion Principles

Durasi utama: **200--350ms**.

Gunakan: - Fade - Soft slide - Scale 98% → 100% - Hover lift ringan -
Smooth state transition

Hindari bounce, animasi agresif, infinite motion yang mengganggu, dan
decorative animation pada form.

## 15. Accessibility & Usability

-   Pastikan contrast memadai.
-   Focus state harus jelas.
-   Interactive target cukup besar untuk touch.
-   Jangan menyampaikan informasi hanya melalui warna.
-   Validation harus memiliki pesan tekstual.
-   Typography harus readable.
-   Decoration tidak boleh mengganggu content.
-   Hormati reduced-motion preference.

## 16. Design Principles

### 1. Creator First

Setiap screen harus membantu creator atau client memahami langkah
berikutnya.

### 2. Human Connection

Creatons adalah tentang manusia dan karya, bukan sekadar transaksi.

### 3. Clarity Over Decoration

Visual boleh memiliki karakter, tetapi informasi tetap prioritas.

### 4. Editorial, Not Ornamental

Personality dibangun melalui editorial composition dan typography, bukan
ornamen berlebihan.

### 5. AI With Evidence

AI membantu memahami informasi dan, ketika relevan, menunjukkan
sumber/status konfirmasi.

### 6. Quiet Premium

Premium berasal dari spacing, typography, consistency, imagery, dan
detail kecil.

### 7. System Before Style

Decoration harus mengikuti component system dan tidak merusak
consistency.

## 17. Implementation Direction

Urutan implementasi: 1. Design tokens 2. Typography 3. Button & Input 4.
Form states 5. Card & surface 6. Navigation 7. Creator/Portfolio
components 8. Chat components 9. AI components 10. Responsive layout 11.
Decorative layer

Komponen inti harus tetap usable tanpa decorative layer. Decoration
adalah enhancement yang dapat dikurangi pada mobile atau accessibility
mode.

## 18. Summary

Creatons menggunakan **Modern Editorial Creative** sebagai arah visual.

Identitas dibangun dari: - Editorial serif + modern sans-serif - Violet
sebagai primary brand color - Lavender sebagai AI language - Coral
sebagai restrained accent - Warm neutral surfaces - Generous
whitespace - Soft borders dan elevation - Subtle editorial decoration -
Human-centered photography - Calm, purposeful motion

> **A creative platform that feels refined and human, without becoming
> ornamental or difficult to use.**
