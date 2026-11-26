// Site-wide settings. The page text itself lives in content/ (home.md, about.md, projects/, notes/).

export const site = {
  name: 'George Stuart',
  tagline: 'Mathematics & Computer Science · University of Queensland',
  description:
    'Programming projects and maths notes by George Stuart, a Mathematics and Computer Science student at the University of Queensland.',

  // To show a CV link in the header and links row: put the PDF at public/cv.pdf and set this to '/cv.pdf'.
  cv: null as string | null,

  // Shown on the home page, the About page and in the footer, in this order.
  links: [
    { label: 'GitHub', href: 'https://github.com/GWStuart' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/george-william-stuart-b0234725b' },
    { label: 'Email', href: 'mailto:g.w.stuart05@gmail.com' },
    { label: 'YouTube', href: 'https://www.youtube.com/@georgestuartprojects6557' },
  ],
};
