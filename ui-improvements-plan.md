# UI Improvements Plan

## Overview

Seven targeted UI improvements to the Virdis desktop interface. All changes are
purely presentational — no data logic, API calls, or routing changes are touched.
Changes are scoped to four files: `SearchBar.tsx`, `MapToolbar.tsx`, `SidePanel.tsx`,
`FieldCard.tsx`, and `Index.tsx`.

---

## Sub-Task 1 — Pill-shaped search bar with keyboard shortcut hint

**Intent**  
Replace the rectangular search bar with a rounded pill shape and add a subtle
`Ctrl K` hint badge on the right side. Adds a `keydown` listener to focus the
input on Ctrl+K.

**Expected Outcomes**
- Input has `rounded-full` instead of `rounded-lg`
- Right side shows a small `Ctrl K` badge (two `<kbd>` elements) when unfocused
- Badge disappears when the input is focused (replaced by the search icon)
- Ctrl+K focuses the input from anywhere on the page

**Todo List**
1. In `SearchBar.tsx`, change `rounded-lg` to `rounded-full` on the input
2. Add a `isFocused` state to track focus
3. On focus hide the kbd hint, show the search icon; on blur reverse
4. Add a `<kbd>` badge absolutely positioned on the right showing `Ctrl K`
5. Add a `useEffect` with a `keydown` listener for `ctrlKey + k` that calls `.focus()` on an input ref

**Relevant Context**
- File: `src/components/SearchBar.tsx`
- Current shape: `rounded-lg px-4 py-2.5 pr-10 w-72`
- Current icon: `<Search>` absolutely positioned `right-3`

**Status:** [ ] pending

---

## Sub-Task 2 — Toolbar: grouped with separators, relocated to bottom-right

**Intent**  
Split the 8 toolbar buttons into three logical groups (view, draw, navigation)
with a thin separator between each group. Move the entire toolbar from
`left-4 top-1/2 -translate-y-1/2` to `right-4 bottom-6`.

**Expected Outcomes**
- Toolbar sits in the bottom-right corner of the map
- Three visible separator lines divide: Layers/Zoom/Style | Draw/NDVI | Compass/Locate
- All existing click handlers and active states are preserved

**Todo List**
1. In `MapToolbar.tsx`, replace the single `items` array with three group arrays
2. Change the wrapper position classes from `left-4 top-1/2 -translate-y-1/2` to `right-4 bottom-6`
3. Render groups with a `<div className="w-full h-px bg-border/50 my-1" />` separator between them

**Relevant Context**
- File: `src/components/MapToolbar.tsx`
- Current wrapper: `absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10 opacity-85`
- Groups: [Layers, Plus, Minus, Map] | [PenTool, Satellite] | [Compass, LocateFixed]

**Status:** [ ] pending

---

## Sub-Task 3 — Side panel header: add "+ New Region" button

**Intent**  
Add a `+ New Region` button in the side panel header that triggers the draw
mode on the map — the same action as clicking the PenTool button in the toolbar.

**Expected Outcomes**
- Header row shows "Region List" on the left and a small `+ New Region` button on the right
- Clicking it calls a new `onStartDraw` prop that is wired to `onToggleDraw` in `Index.tsx`
- Button has a green-tinted style matching the primary color

**Todo List**
1. Add `onStartDraw?: () => void` prop to `SidePanelProps`
2. Render a `<button>` with `Plus` icon and "New Region" text in the header `div`
3. In `Index.tsx`, pass a handler that sets draw mode on `MapView` — wire through a new `onStartDrawFromPanel` callback that calls the existing `onToggleDraw` logic already in `MapView`'s exposed state; the simplest approach is lifting a `drawMode` state to `Index.tsx` and passing it down to both `MapView` and `SidePanel`
4. Style the button: `flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20`

**Relevant Context**
- File: `src/components/SidePanel.tsx` — header at line 73
- File: `src/pages/Index.tsx` — `SidePanel` usage at line 170
- File: `src/components/MapView.tsx` — already has internal `drawMode` state; expose via a `onRequestDraw` prop or lift state to Index

**Status:** [ ] pending

---

## Sub-Task 4 — Move Map/Analytics toggle into side panel header

**Intent**  
Remove the floating `Map / Analytics` toggle from the top-center of the map
canvas and embed it as two tab buttons inside the side panel header, replacing
the plain title row.

**Expected Outcomes**
- No floating toggle visible over the map
- Side panel header shows "Map" and "Analytics" tab buttons alongside the title area
- Clicking a tab still switches the main content area between `MapView` and `WeatherView`
- `+ New Region` button (Sub-Task 3) is only visible when the Map tab is active

**Todo List**
1. In `Index.tsx`, remove the `<div>` containing the floating toggle (lines 150–157)
2. Add `view` and `onViewChange` props to `SidePanel`
3. In `SidePanel.tsx` header, render two tab buttons driven by the `view` prop
4. `+ New Region` button renders only when `view === "map"`

**Relevant Context**
- File: `src/pages/Index.tsx` — floating toggle at lines 150–157; `view` state at line 38
- File: `src/components/SidePanel.tsx` — header `div` at lines 73–75

**Status:** [ ] pending

---

## Sub-Task 5 — Empty state: single animated prompt

**Intent**  
Replace the verbose 3-step card list in the empty state with a single line of
text and a pulsing animated arrow that points toward the draw button. Since the
toolbar is now bottom-right (Sub-Task 2), the arrow points downward-right.

**Expected Outcomes**
- Empty state shows the `MapPin` dashed circle icon (kept)
- "No regions yet" heading (kept)
- Single instruction line: "Draw a region on the map to begin"
- An animated downward-right arrow (`ArrowDownRight` from lucide) that pulses with a CSS `animate-bounce` or `animate-pulse`
- The 3 numbered step cards are removed

**Todo List**
1. In `SidePanel.tsx`, find the empty state block (lines 132–156)
2. Remove the three `<div className="flex items-start gap-2.5 ...">` step cards
3. Replace with a single `<p>` and an `<ArrowDownRight>` icon with `animate-bounce`
4. Import `ArrowDownRight` from lucide-react

**Relevant Context**
- File: `src/components/SidePanel.tsx` — empty state at lines 132–156
- Lucide icons already imported in this file

**Status:** [ ] pending

---

## Sub-Task 6 — Field cards: NDVI health indicator dot

**Intent**  
Add a small colored status dot to each field card next to the crop name.
The dot color maps to the NDVI value: green (healthy ≥ 0.6), amber (moderate
0.4–0.6), orange (stressed 0.2–0.4), red (critical < 0.2). If no NDVI data
is available, render a grey dot.

**Expected Outcomes**
- A `w-2 h-2 rounded-full` dot appears to the left of the crop name text
- Dot is green / amber / orange / red / grey based on `field.ndvi` value
- Existing NDVI change number (`+0.05`) is retained next to the field name

**Todo List**
1. In `FieldCard.tsx`, write a helper `getNdviColor(ndvi?: number): string` that returns a Tailwind bg color class
2. Render a `<span className={`w-2 h-2 rounded-full flex-shrink-0 ${getNdviColor(field.ndvi)}`} />` before the crop name text
3. Check the `Field` type in `src/data/fields.ts` to confirm the property name for current NDVI value

**Relevant Context**
- File: `src/components/FieldCard.tsx` — crop line at line 71
- File: `src/data/fields.ts` — `Field` type definition

**Status:** [ ] pending

---

## Implementation Order

Sub-tasks are ordered so later ones can depend on earlier ones:

1. Sub-Task 1 — SearchBar pill (independent)
2. Sub-Task 2 — Toolbar reposition (independent)
3. Sub-Task 3 — New Region button in panel (independent)
4. Sub-Task 4 — Move toggle into panel (depends on Sub-Task 3 for the header layout)
5. Sub-Task 5 — Empty state (depends on Sub-Task 4 for the arrow direction)
6. Sub-Task 6 — Health dot on cards (independent)
