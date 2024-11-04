import { useEffect, useRef, ReactNode } from "react";

import { useAnimation, useInView, motion } from "framer-motion";

const Hero: React.FC = () => {
    return (
      <section className="flex items-center justify-center text-slate-100 overflow-hidden bg-slate-900  min-h-screen">
        <div className="relative text-center">
          <div className="pointer-events-none relative z-10 text-center">
            <Reveal>
              <h1 className="pointer-events-auto text-6xl font-black text-slate-100 md:text-8xl">
                TECKAM
              </h1>
            </Reveal>
            <Reveal>
              <h2 className="pointer-events-auto my-4 text-2xl md:my-6 md:text-4xl">
                <span className="font-semibold">
                  Tu tienda de componentes y accesorios para computadoras
                </span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="pointer-events-auto mx-auto max-w-2xl text-base md:text-lg">
                Contamos con una amplia variedad de productos de alta calidad, desde tarjetas gráficas y procesadores hasta periféricos esenciales. ¡Encuentra todo lo que necesitas para optimizar tu setup!
              </p>
            </Reveal>
            <Reveal>
              <button className="pointer-events-auto mt-6 rounded bg-blue-900 px-6 py-3 font-medium text-slate-100 transition-all hover:bg-indigo-700 active:scale-95 md:mt-8">
                Explorar Productos
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    );
  };
  
  




interface RevealProps {
  children: ReactNode;
}

export const Reveal: React.FC<RevealProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute bottom-1 left-0 right-0 top-1 z-20 bg-indigo-600"
      />
    </div>
  );
};

export default Hero;
