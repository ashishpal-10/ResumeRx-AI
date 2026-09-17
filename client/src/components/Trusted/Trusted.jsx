import {
  Building2,
  Cloud,
  BarChart3,
  Rocket,
} from "lucide-react";

const Trusted = () => {
  const companies = [
    {
      Icon: Building2,
      name: "TechCorp",
    },
    {
      Icon: Cloud,
      name: "CloudSync",
    },
    {
      Icon: BarChart3,
      name: "DataFlow",
    },
    {
      Icon: Rocket,
      name: "LaunchPad",
    },
  ];

  return (
    <section className="mt-6 border-t border-[#464554]/10 py-10">

      <p className="mb-8 text-center text-xs uppercase tracking-widest text-[#908fa0]">
        Trusted by ambitious professionals at
      </p>

      <div className="flex flex-wrap justify-center gap-10 opacity-60 grayscale transition duration-500 hover:grayscale-0 md:gap-20">

        {companies.map(({ Icon, name }) => (
          <div
            key={name}
            className="flex items-center gap-2 text-xl font-bold text-[#c7c4d7]"
          >
            <Icon size={22} className="text-[#c0c1ff]" />
            {name}
          </div>
        ))}

      </div>

    </section>
  );
};

export default Trusted;
