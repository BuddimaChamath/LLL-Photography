import React from 'react';
import { ArrowRight, Camera, Heart, Users } from 'lucide-react';
import { PORTRAIT_OF_THARUN } from '../../content/hero';
import { Link } from '../../router';
import { Reveal } from '../ui/Reveal';
import { SmartImage } from '../ui/SmartImage';

const features = [
  { icon: Camera, title: 'Expert Technique', description: 'Using the latest equipment and advanced techniques' },
  { icon: Heart, title: 'Wedding Specialist', description: 'Capturing magical moments on your special day' },
  { icon: Users, title: 'Freelance Professional', description: 'Flexible services tailored to your unique needs' },
];

const Portrait: React.FC = () => (
  <div className="aspect-[4/5] overflow-hidden bg-line/50">
    <SmartImage
      src={PORTRAIT_OF_THARUN}
      alt="Tharun Goutham, photographer, with his camera"
      widths={[480, 720, 960, 1200]}
      sizes="(min-width: 1024px) 38vw, 100vw"
      ratio={4 / 5}
      className="h-full w-full object-cover"
    />
  </div>
);

/** Short introduction for the home page. */
export const AboutIntro: React.FC = () => (
  <section aria-labelledby="intro-title" className="py-24 sm:py-32">
    <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
      <Reveal className="lg:col-span-5">
        <Portrait />
      </Reveal>
      <div className="lg:col-span-7">
        <Reveal as="p" className="eyebrow">
          Hello
        </Reveal>
        <Reveal as="h2" id="intro-title" delay={80} className="mt-4 font-serif text-4xl font-light leading-[1.1] sm:text-5xl">
          I’m Tharun — your friendly photographer
        </Reveal>
        <Reveal delay={160} className="mt-8 space-y-5 text-[15px] leading-[1.85] text-muted sm:text-base">
          <p>
            With over 7 years of experience, I capture life’s most precious moments — weddings, portraits, travel and
            events — with an artistic eye and a love of visual storytelling.
          </p>
          <p className="font-serif text-2xl font-light italic leading-snug text-ink">
            “Every photo should tell a story and evoke emotion.”
          </p>
        </Reveal>
        <Reveal delay={220} className="mt-10">
          <Link to="/about" className="text-link">
            More about me <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/** Full story for the About page. */
export const AboutStory: React.FC = () => (
  <section aria-label="My story" className="pb-24 sm:pb-32">
    <div className="container-site grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
      <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
        <Portrait />
      </Reveal>
      <div className="lg:col-span-7 lg:pt-6">
        <Reveal as="h2" className="font-serif text-4xl font-light leading-[1.1] sm:text-5xl">
          Hello, I’m Tharun
        </Reveal>
        <Reveal delay={100} className="mt-8 space-y-5 text-[15px] leading-[1.85] text-muted sm:text-base">
          <p>
            I’m <span className="text-ink">Tharun Goutham</span>, a professional photographer with over 7 years of
            experience capturing life’s most precious moments. My passion for photography began when I received my
            first camera as a teenager, and it has grown into a lifelong pursuit of visual storytelling.
          </p>
          <p>
            I specialise in portrait, wedding, travel, and event photography, bringing a unique perspective and
            artistic vision to each shoot.
          </p>
        </Reveal>

        <Reveal as="figure" delay={160} className="my-12 border-l border-accent/60 pl-6 sm:pl-8">
          <blockquote className="font-serif text-3xl font-light italic leading-snug sm:text-4xl">
            “My philosophy is simple: every photo should tell a story and evoke emotion.”
          </blockquote>
        </Reveal>

        <ul className="grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <Reveal as="li" key={title} delay={i * 90}>
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Link to="/portfolio" className="btn-solid">
            See my work
          </Link>
          <Link to="/services" className="btn-outline">
            Packages
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);
