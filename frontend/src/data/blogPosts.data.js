// Blog post data — deliberately shaped to mirror the real blog_posts
// table (database/migrations/..._create_blog_posts.sql) field for
// field, camelCase instead of snake_case, so mapping this onto a real
// Supabase table later is a rename, not a redesign. See
// services/blogService.js for the read layer built around this shape.
//
// Content rules, consistent with everything else in this project:
// - `author` is "Henil Enterprise" (the company), never an invented
//   named individual — the same reasoning as never inventing a
//   testimonial's attribution.
// - No fabricated technical specifications anywhere in `content` —
//   thickness guidance in particular stays about the FACTORS that
//   matter (application, span, load, visibility) rather than stating a
//   specific number, the same deferral used in materials.data.js and
//   the FAQ's thickness answer.
// - `coverImageIcon` follows the same honest-placeholder pattern as
//   ProductVisual/ApplicationVisual — no real photography exists yet.
// - `readingTime` is NOT hand-typed — it's computed from the real word
//   count of `content` at render/build time (see utils/blog.js), so it
//   can never drift from the actual article length.

export const BLOG_POSTS = [
  {
    id: "acrylic-vs-polycarbonate",
    slug: "acrylic-vs-polycarbonate",
    title: "Acrylic vs Polycarbonate: Which Material Fits Your Application?",
    excerpt: "Both are common choices for transparent fabricated components, but they suit different jobs. Here's how to think about the choice.",
    coverImageIcon: "Scale",
    author: "Henil Enterprise",
    publishedAt: "2026-01-08",
    published: true,
    content: `Acrylic and polycarbonate are the two materials we fabricate with, and they're often considered for the same kind of component — a guard, a window, an enclosure — which makes the choice between them a genuinely common question.

The short version: acrylic offers better optical clarity and is generally easier to cut, machine, and polish to a finished edge. Polycarbonate is significantly more impact-resistant and holds up better under sharp impact, which matters most for machine guards and safety-critical enclosures.

Neither material is a strict upgrade over the other — the right choice depends on what the part actually needs to do. A display panel or light-diffusion enclosure, where clarity and finish matter most and impact risk is low, usually favours acrylic. A guard around moving machinery, where an impact needs to be survivable rather than just unlikely, usually favours polycarbonate.

Cost, weight, and surface durability are worth weighing too: acrylic tends to be more affordable and scratch-resistant on the surface, while polycarbonate is the more forgiving choice if the part will see rough handling or occasional contact.

If you're not sure which fits your application, our Material Selector covers both in more depth, or you can send your requirement directly and we'll advise based on what the part needs to do.`,
  },
  {
    id: "choosing-acrylic-thickness",
    slug: "choosing-acrylic-thickness",
    title: "Choosing Acrylic Thickness: What Actually Matters",
    excerpt: "There's no single right thickness — it depends on span, load, and how the part is mounted. Here's what to think through before you specify one.",
    coverImageIcon: "Ruler",
    author: "Henil Enterprise",
    publishedAt: "2026-01-15",
    published: true,
    content: `We get asked about acrylic thickness more than almost anything else, and the honest answer is that there isn't a default — the right thickness depends on the part, not a rule of thumb.

A few factors do most of the work in that decision. Unsupported span matters a lot: a panel that's fully framed on all four edges can run thinner than one that's only supported on two sides or cantilevered out from a bracket. Expected load matters too — a static display panel and a guard that might get leaned on are different problems even if they're the same size.

Visibility and optical requirements play a role as well. Thicker sheet can introduce a slight tint or distortion at the edges depending on the application, which matters more for some uses than others. And mounting method interacts with all of the above — a bonded, fully-supported enclosure has different requirements than a panel held by a handful of fasteners.

Because thickness is genuinely application-specific, we don't quote a fixed range up front — we work through it with you based on the actual part, its span, its load, and how it'll be mounted. If you already know your application, sending that context with your quote request lets us recommend a thickness rather than you having to guess one.`,
  },
  {
    id: "industrial-machine-guards",
    slug: "industrial-machine-guards",
    title: "What Makes a Good Industrial Machine Guard",
    excerpt: "A machine guard has one job that matters more than any other: staying between a person and a hazard. Here's what that means for material and fabrication choices.",
    coverImageIcon: "ShieldCheck",
    author: "Henil Enterprise",
    publishedAt: "2026-01-22",
    published: true,
    content: `A machine guard exists to do one thing: keep a person separated from a hazard while the process behind it keeps running. Everything about how it's specified and built follows from that.

Visibility is usually non-negotiable — an operator needs to see the process to run it safely, which is exactly why guards get fabricated from acrylic or polycarbonate rather than solid metal panelling in the first place. The material choice between the two often comes down to the kind of hazard involved: for guards around fast-moving or high-force machinery, polycarbonate's impact resistance is usually the deciding factor.

Fit matters as much as material. A guard that's been fabricated to the exact geometry of the machine it protects — using CNC routing for mounting points and cutouts, and bending or bonding where the guard needs to wrap around a corner rather than sit flat — stays in place and stays effective. A guard that was adapted from a generic size rarely fits as well, and fit is exactly where a guard earns its purpose.

This is also why machine guards are almost always a custom-fabrication conversation rather than a catalogue purchase — every machine's geometry, mounting points, and hazard zones are a little different, even within the same equipment class.

If you're specifying a guard for a specific machine, sending its mounting points and the geometry you need to clear (a drawing, a sketch, or even photos) gets us to an accurate quote faster than a general description.`,
  },
  {
    id: "acrylic-fabrication",
    slug: "acrylic-fabrication",
    title: "What Acrylic Fabrication Actually Involves",
    excerpt: "From flat sheet to a finished component — an overview of the processes that turn acrylic stock into a usable part.",
    coverImageIcon: "Layers",
    author: "Henil Enterprise",
    publishedAt: "2026-01-29",
    published: true,
    content: `"Acrylic fabrication" covers a handful of distinct processes, and most real components need more than one of them combined.

Cutting comes first — CNC routing for profiles, cutouts, and mounting holes, or laser cutting where the geometry is finer or more intricate than routing handles well. Both start from flat sheet stock and produce the part's outline.

From there, forming and joining processes turn flat pieces into a finished shape. Bending heat-forms acrylic to a specified angle for folded or curved components, useful anywhere a single-piece part is preferable to a bonded corner. Bonding joins separate pieces — solvent or adhesive bonding — into a multi-part assembly, which is how larger or more complex components get built from pieces too big or too shaped to form from one sheet.

The order these happen in, and which ones a given part actually needs, depends entirely on the component. A simple flat panel might only need cutting. A multi-panel enclosure needs cutting, bonding, and often bending to get the corners right.

What ties all of it together is that we fabricate to your drawing rather than adapting a standard part — the process sequence gets built around what you actually need, not the other way around.`,
  },
  {
    id: "polycarbonate-fabrication",
    slug: "polycarbonate-fabrication",
    title: "Polycarbonate Fabrication: What's Different From Acrylic",
    excerpt: "The same core processes apply, but polycarbonate's properties change a few things about how it's handled and where it's used.",
    coverImageIcon: "Boxes",
    author: "Henil Enterprise",
    publishedAt: "2026-02-05",
    published: true,
    content: `Polycarbonate goes through largely the same fabrication processes as acrylic — cutting, CNC routing, bending, bonding — but its properties change how each of those gets approached and what it's typically used for.

The material's impact resistance is the headline property, and it's why polycarbonate fabrication skews toward guards, covers, and enclosures where surviving an impact matters more than optical perfection. That same toughness, though, means it behaves a little differently under cutting and forming than acrylic does, which is part of why we treat acrylic and polycarbonate cutting as distinct capabilities rather than one generic "cutting" process.

Polycarbonate is also more UV-sensitive than acrylic in its base form, which is worth factoring in for anything headed outdoors or exposed to prolonged direct light — a UV-stable grade or coating is a reasonable thing to specify for that kind of application.

Bonding polycarbonate follows the same general logic as acrylic — joining separate pieces into a finished assembly — and it's often the right approach for polycarbonate enclosures and multi-panel guards where the component is too large or too shaped to form from a single sheet.

If your application is outdoor, high-impact, or otherwise demanding, it's worth mentioning that context when you request a quote — it affects both material choice and finish.`,
  },
  {
    id: "cnc-acrylic-cutting",
    slug: "cnc-acrylic-cutting",
    title: "CNC Acrylic Cutting: When Routing Is the Right Call",
    excerpt: "CNC routing and laser cutting can both produce a cut acrylic part — here's how to think about which one fits your geometry.",
    coverImageIcon: "Cog",
    author: "Henil Enterprise",
    publishedAt: "2026-02-12",
    published: true,
    content: `CNC routing is computer-controlled cutting guided directly by a drawing or CAD file, and it's one of the two main ways we cut acrylic — the other being laser cutting.

Routing tends to be the better fit for panels with multiple cutouts and mounting holes, parts that need consistent, repeatable geometry across a production run, and components with curved or irregular edge profiles that would be awkward to cut by hand. Because it's driven directly from your file, the same profile comes out the same way on unit one and unit fifty.

Laser cutting, by comparison, tends to suit finer or more intricate detail — small internal features, decorative or branded elements, and prototype work where you want to see a design before committing to a full run.

In practice, a lot of parts use routing for the main profile and mounting geometry, with laser cutting reserved for fine detail work within that same part. Which one (or both) makes sense for a given component comes down to the geometry itself more than any general rule.

If you're not sure which process your part needs, that's a normal thing to leave to us — send the drawing and quantity, and we'll fabricate it using whichever combination of cutting methods actually fits the geometry.`,
  },
  {
    id: "laser-cutting",
    slug: "laser-cutting",
    title: "Laser Cutting Acrylic and Polycarbonate: Where It Excels",
    excerpt: "Laser cutting isn't a replacement for CNC routing — it's the better tool for a specific kind of geometry.",
    coverImageIcon: "Zap",
    author: "Henil Enterprise",
    publishedAt: "2026-02-19",
    published: true,
    content: `Laser cutting uses a guided laser rather than a mechanical bit to cut through sheet material, and the difference in method is exactly why it suits different work than CNC routing does.

Because there's no physical cutting tool making contact with the material, laser cutting handles intricate or detailed profiles — fine internal features, decorative or branded elements, small precision components — more cleanly than mechanical cutting typically can. It's also a strong fit for prototype work, where you want an accurate, clean-edged part quickly before committing to a full production run.

Both acrylic and polycarbonate can be laser cut, though the two materials behave a little differently under the process, which is part of why we treat them as related but distinct capabilities rather than one interchangeable process.

Laser cutting isn't the default choice for every job — for panels that need multiple mounting holes and a repeatable production profile across a large batch, CNC routing is often the more practical fit. The two processes complement each other more than they compete, and a single component sometimes uses both.

If your part has fine detail work, a prototype timeline, or a design you want to see before scaling up, mention that when you request a quote — it's exactly the kind of context that helps us choose the right process from the start.`,
  },
  {
    id: "acrylic-bending",
    slug: "acrylic-bending",
    title: "Acrylic Bending: Getting a Folded Edge Without a Seam",
    excerpt: "Heat-forming acrylic to an angle avoids a bonded corner entirely — useful more often than it gets considered.",
    coverImageIcon: "GitMerge",
    author: "Henil Enterprise",
    publishedAt: "2026-02-26",
    published: true,
    content: `Acrylic bending heat-forms a sheet to a specified angle, producing a folded or curved component from a single piece rather than two pieces joined at a bonded corner.

The appeal is straightforward: a bent corner has no seam, which means no bond line to fail under stress and no visible joint to finish. For components combining a flat section with a folded edge — a display stand, an enclosure corner, a point-of-sale fixture — bending often produces a stronger and cleaner result than bonding two flat pieces together would.

It's not always the right choice, though. Bending works within the geometry a single sheet can be formed into; a component with multiple angles, a genuinely three-dimensional shape, or panels that need to be different thicknesses is usually better served by cutting and bonding separate pieces instead. The decision generally comes down to whether the part's shape can reasonably come from one folded sheet or needs to be assembled from several.

Consistency across a production run matters here too — a formed batch should hold the same bend angle from the first unit to the last, which is part of why bending is treated as a controlled fabrication process rather than something done freehand per piece.

If your component has a folded edge in the design, it's worth asking whether bending is the better fit before defaulting to a bonded corner — send the drawing and we'll tell you which approach suits the geometry.`,
  },
  {
    id: "acrylic-bonding",
    slug: "acrylic-bonding",
    title: "Acrylic Bonding: How Multi-Part Assemblies Get Built",
    excerpt: "Bonding is how a component too large or too complex for a single sheet becomes one finished assembly.",
    coverImageIcon: "Link2",
    author: "Henil Enterprise",
    publishedAt: "2026-03-05",
    published: true,
    content: `Bonding joins separate acrylic (or polycarbonate) pieces into a single finished assembly, using solvent or adhesive bonding depending on the joint and the application.

It's the process that makes larger or more complex components possible in the first place. A multi-panel enclosure, a tank, a cabinet — anything too large or too intricately shaped to cut from one piece of sheet — gets built by cutting the individual panels to size and bonding them together into the finished part.

Bonding also comes into play alongside other processes rather than instead of them. A component might be CNC routed for its panel profiles, then bonded at the seams, with a bent corner where a fold makes more sense than a joint. Which combination applies depends on the part's actual geometry, not a fixed sequence.

The quality of a bonded joint matters as much as the cut quality of the panels themselves — a clean, properly bonded seam holds up under the same conditions the rest of the assembly needs to handle, which is why bonding gets treated as a precision process rather than an afterthought once the pieces are cut.

If your component is larger than a single sheet or combines multiple panels, bonding is likely part of how it gets built — send your drawing and we'll work out the panel breakdown and joint approach as part of the quote.`,
  },
  {
    id: "industrial-applications",
    slug: "industrial-applications",
    title: "Where Acrylic and Polycarbonate Fabrication Actually Gets Used",
    excerpt: "A tour through the industrial applications where fabricated acrylic and polycarbonate components show up — and why.",
    coverImageIcon: "Factory",
    author: "Henil Enterprise",
    publishedAt: "2026-03-12",
    published: true,
    content: `Fabricated acrylic and polycarbonate components show up across a wider range of industrial applications than people usually expect, and the common thread across almost all of them is the same: something needs to be seen through while also being protected, contained, or guarded.

Machine guards and safety shields are the most visible category — anywhere a hazard needs a barrier that doesn't block visibility, a fabricated guard is usually the answer. Inspection windows and sight glasses serve a related purpose on a smaller scale: letting someone monitor an enclosed process without opening the housing.

Containment shows up too — tanks and enclosures built for process fluids or sensitive equipment, where clarity for monitoring matters alongside the containment itself. On the commercial side, boxes, cabinets, and display fixtures use the same core fabrication processes for a very different purpose: presentation rather than protection.

Across industries — pharmaceutical, food processing, automotive, general manufacturing — the specific application shifts, but the underlying requirement stays consistent: a component built to fit a specific piece of equipment or a specific process, not pulled from a generic parts bin.

If you're trying to figure out whether your application is a good fit for fabricated acrylic or polycarbonate, our Industrial Applications section and Industries page cover the categories in more depth — or you can just describe what you're trying to protect, contain, or display and we'll tell you what fits.`,
  },
];
