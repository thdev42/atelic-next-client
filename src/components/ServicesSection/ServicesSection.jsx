import Image from "next/image";
import Iceberg from "../../../assets/servicesiceberg.png";
export default function ServicesSection() {
  return (
    <section className="z-10 font-sora overflow-hidden bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-16 min-h-screen relative">
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-14">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl 2xl:text-[60px] lg:text-6xl font-light text-black">
                Our
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black -mt-2">
                Solutions
              </h2>
            </div>

            <p className="text-black text-base 2xl:text-[22px] font-light sm:text-lg 2xl:leading-9">
              Atelic's vision is to create value within the AI ecosystem by
              driving success & trust for our customers. We do this by providing
              education, problem solving and real business solutions, thus
              removing the complexity of AI. We are a SaaS2 business, providing
              both ROI services and agentic AI software.
            </p>

            <button className="bg-[#335F86] hover:bg-slate-700 text-[16px] text-white px-9 2xl:w-[200px] py-3 rounded-[8px] font-light transition-colors duration-200">
              Read More
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="relative p-8 aspect-square flex items-center justify-center"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div className="relative">
                  <Image
                    src={Iceberg}
                    alt="AI Solutions Visualization - Digital iceberg showing visible AI solutions above and complex infrastructure below"
                    width={1024}
                    height={1024}
                    className=""
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ borderWidth: 1, opacity: 0.15 }}
          className="mt-36 w-full border-1 border-black"
        ></div>
      </div>
    </section>
  );
}
