import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { BeforeAfterSlider } from "../../../../components/ui/before-after-slider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const AboutSection = (): JSX.Element => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const experienceCircleRef = useRef<HTMLDivElement>(null);
  const featuresCardRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Split text into characters
    const splitText = new SplitText(headingRef.current, { 
      type: "chars,words",
      charsClass: "char",
      wordsClass: "word"
    });
    
    // Create timeline for smooth sequencing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Initial state
    gsap.set(splitText.chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      transformOrigin: "50% 50% -50px"
    });

    // Animate each character
    tl.to(splitText.chars, {
      duration: 1.2,
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: {
        amount: 1,
        from: "start"
      },
      ease: "power4.out"
    });

    // Add hover animation
    if (headingWrapperRef.current) {
      headingWrapperRef.current.addEventListener('mousemove', (e) => {
        const rect = headingWrapperRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        gsap.to(splitText.chars, {
          duration: 0.5,
          y: (i, target) => (y - 0.5) * 15 * Math.sin((i + 1) * 0.5),
          x: (i, target) => (x - 0.5) * 15 * Math.cos((i + 1) * 0.5),
          rotationY: (x - 0.5) * 20,
          rotationX: (y - 0.5) * -20,
          ease: "power2.out",
          stagger: {
            amount: 0.3,
            from: "center"
          }
        });
      });

      headingWrapperRef.current.addEventListener('mouseleave', () => {
        gsap.to(splitText.chars, {
          duration: 1,
          y: 0,
          x: 0,
          rotationY: 0,
          rotationX: 0,
          ease: "elastic.out(1, 0.3)",
          stagger: {
            amount: 0.3,
            from: "center"
          }
        });
      });
    }

    // Cleanup function
    return () => {
      splitText.revert();
      if (headingWrapperRef.current) {
        headingWrapperRef.current.removeEventListener('mousemove', () => {});
        headingWrapperRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Simple entrance animation for slider (NO PARALLAX)
    if (sliderRef.current && sliderContainerRef.current) {
      gsap.fromTo(sliderRef.current,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sliderContainerRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Parallax effect for experience circle (KEEP PARALLAX)
    

    // Parallax effect for features card (KEEP PARALLAX)
    if (featuresCardRef.current) {
      gsap.to(featuresCardRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Fade in animation for description (KEEP PARALLAX)
    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current,
        { 
          opacity: 0,
          y: 50,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Data for the feature cards
  const features = [
    {
      id: "01",
      title: "Flexible Budget & Taste",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: "02",
      title: "On-time Delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: "03",
      title: "700+ Happy Customers",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white rounded-t-[20px] py-28 overflow-hidden"
    >
      <div className="container mx-auto max-w-[1276px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div 
              ref={headingWrapperRef}
              className="perspective-[1000px] cursor-default mb-12"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h2 
                ref={headingRef}
                className="font-['Fahkwang',Helvetica] font-semibold text-[#01190c] text-[40px] tracking-[-1.00px] leading-[49.9px]"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0)',
                }}
              >
                Elevating Interiors with Passion and Purpose
              </h2>
            </div>

            <div className="relative flex-1">
              <div 
                ref={sliderContainerRef}
                className="relative overflow-hidden h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  maxHeight: '460px',
                }}
              >
                <div
                  ref={sliderRef}
                  className="h-full"
                  style={{
                    transformOrigin: 'center center',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <BeforeAfterSlider
                    beforeImage="/before.jpg"
                    afterImage="/after.jpg"
                    beforeLabel="BEFORE"
                    afterLabel="AFTER"
                    height="100%"
                    className="w-full max-w-[730px] h-full"
                    style={{
                      borderRadius: '15px',
                      overflow: 'hidden',
                      minHeight: '460px'
                    }}
                  />
                </div>
              </div>

              <div 
                ref={experienceCircleRef}
                className="absolute bottom-0 right-20 translate-x-1/2 w-[180px] h-[192px] "
                style={{
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  
                }}
              >
                <div className="absolute w-[154px] h-[164px] top-[27px] left-1 bg-primary rounded-[97.21px/103.29px]" />
                <img
                  className="absolute w-[188px] h-[200px] top-0 left-0"
                  alt="Ellipse"
                  src="/ellipse-141.svg"
                />
                <div className="absolute w-[139px] top-[126px] left-[38px] font-['Fahkwang',Helvetica] font-normal text-primary text-base text-center tracking-[0] leading-[26px]">
                  <span className="font-medium">
                    YEARS
                    <br />
                    EXPERIENCED
                  </span>
                  <span className="font-['Inter',Helvetica] font-medium">
                    {" "}
                    <br />
                  </span>
                </div>
                <div className="absolute w-[103px] top-[74px] left-[61px] font-['Fahkwang',Helvetica] font-bold text-primary text-4xl text-center tracking-[0] leading-[50px] whitespace-nowrap">
                  9+
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p 
              ref={descriptionRef}
              className="font-['Fahkwang',Helvetica] font-normal text-[#626161] text-sm text-justify tracking-[0] leading-[26.6px] mb-12"
            >
              We are a full-service interior design studio dedicated to creating
              beautifully curated spaces that reflect your unique style and
              needs. From cozy homes to dynamic commercial environments, our
              team blends aesthetics with functionality to deliver results that
              exceed expectations.
            </p>

            <Card 
              ref={featuresCardRef}
              className="w-full bg-[#f6f8fa] rounded-[15px] border-none shadow-none flex-1 will-change-transform"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)',
                marginTop: '30px',
              }}
            >
              <CardContent className="p-12 space-y-10 h-full flex flex-col justify-center">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-8">
                    <div className="flex-shrink-0 w-[60px] h-[57px] bg-primary rounded-[11px] flex items-center justify-center">
                      <div className="font-['Fahkwang',Helvetica] font-bold text-[#01190c] text-xl">
                        {feature.id}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-['Fahkwang',Helvetica] font-semibold text-black text-xl tracking-[-1.00px] leading-[42.3px]">
                        {feature.title}
                      </h3>
                      <p className="font-['Fahkwang',Helvetica] font-normal text-[#6c6c6c] text-sm tracking-[0] leading-[26.6px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};