import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problems } from '@/components/sections/Problems';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Stack } from '@/components/sections/Stack';
import { WhyUs } from '@/components/sections/WhyUs';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Services />
        <Process />
        <Stack />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
