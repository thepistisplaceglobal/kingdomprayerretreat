"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { User } from "lucide-react";
import { useRef } from "react";

function Testimonials() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <main className="w-full">
      <section
        className="relative  h-full container text-black mx-auto  rounded-lg  py-14 bg-white"
        ref={testimonialRef}
      >
        <article className={"max-w-screen-md mx-auto text-center space-y-2 "}>
          <TimelineContent
            as="h1"
            className={"xl:text-4xl md:text-3xl text-2xl font-medium"}
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            My Pistis Place Experience❤️
          </TimelineContent>
          <TimelineContent
            as="p"
            className={"mx-auto text-gray-500"}
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            {`Let's hear how Pistis Place has changed your life!`}
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3  gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className=" lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"I'm thanking God for saving me from a fire outbreak. The incident occured at my home. I got home around 11pm and was too tired to cook, I then decided to just boil water for eggs and ended sleeping off. I woke up around 4am, went to the kitchen and found the water boiling over. The kettle was melted and the entire house was very stufy. I'm honeslty so grateful to God for preserving me."`}
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold md:text-base lg:text-xl text-sm">
                      Mr. Bill Elisha
                    </h2>
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-gray-200/50 flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] lg:h-fit  lg:shrink-0 flex flex-col justify-between relative bg-[#300460] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"During the third day of KPR 2025, there was a minister that sat beside me, and God used him as a divine help to bless me financially. I do not take this for granted at all, so I return all glory to God"`}
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-lg md:text-base lg:text-xl">
                      Sister Inimfon Willson
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-white/80" />
                  </div>
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full  md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#2a2a2a] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"I want to thank God for what He has done in my life. I've been a chronic smoker for a really long time but when I came to the Pistis PLace , God helped me to stop smoking. I'm returning all glory to God because I couldn't have done it without Him."`}
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold md:text-base lg:text-xl text-lg">
                      Mr. Divine Oko Duke
                    </h2>
                  </div>
                  <div className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 lg:w-8 lg:h-8 text-white/60" />
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#2a2a2a] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"The discipleship program here equipped me to serve God with confidence and boldness I never knew I had. The investment in my spiritual journey has been transformational. I'm grateful for the mentorship and the practical application of biblical principles in daily life."`}
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold md:text-base lg:text-xl text-lg">
                      Brother David Williams
                    </h2>
                  </div>
                  <div className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 lg:w-8 lg:h-8 text-white/60" />
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#2a2a2a] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"I want to thank God for His faithfulness and mercy in my life. I was priviledged to be selected as one of the two people that were chosen to travel to Belgium to play football. I was among the top four and I don't takeit for granted. It really was a dream come true and I could visibly see God's hand in it and I have come to return all glory to God."`}
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold md:text-base lg:text-xl text-lg">
                      Brother Victor Michael
                    </h2>
                  </div>
                  <div className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 lg:w-8 lg:h-8 text-white/60" />
                  </div>
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className=" lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-[#300460] text-white overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"The discipleship program here equipped me to serve God with confidence and boldness I never knew I had. The investment in my spiritual journey has been transformational. I'm grateful for the mentorship and the practical application of biblical principles in daily life."`}
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold md:text-base lg:text-xl text-lg">
                      Brother David Williams
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-white/80" />
                  </div>
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-200 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto">
                <p className="text-sm md:text-sm lg:text-base">
                  {`"Ever since KPR Canine Breeds (Our Dog Company) has highly increased in terms of social recognition. I had a referral from a friend abroad, a doctor in Mobil whose contact I doubted I still had randomly replied to my status. Someone I least expected advertised the brand. I've had to travel down to Eket twice to attend to some dogs. I have a pre-order for a puppy that hasn't even littered. It's been really amazing. The revelation of 'These Seven Also' is stuck with me. GLORY TO GOD!!!"`}
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold md:text-base lg:text-xl text-lg">
                      Brother Dolakpo Fakeye
                    </h2>
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-gray-200/50 flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Testimonials;
