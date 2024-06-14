import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Server",
    title: "Kinerja Tinggi",
    description:
      "Server kami dirancang untuk memberikan kinerja optimal dengan uptime hampir 100%, memastikan bisnis Anda selalu berjalan lancar.",
  },
  {
    icon: "Shield",
    title: "Keamanan Terjamin",
    description:
      "Data Anda adalah prioritas kami. Kami menyediakan sistem keamanan berlapis untuk melindungi data dari ancaman siber.",
  },
  {
    icon: "TrendingUp",
    title: "Skalabilitas",
    description:
      "Solusi kami mudah disesuaikan dengan pertumbuhan bisnis Anda, memungkinkan penambahan sumber daya sesuai kebutuhan.",
  },
  {
    icon: "Headphones",
    title: "Support 24/7",
    description:
      "Tim dukungan kami siap membantu Anda kapan saja, memastikan semua masalah teknis dapat diselesaikan dengan cepat dan efisien.",
  },
  {
    icon: "DollarSign",
    title: "Biaya Efektif",
    description:
      "Kami menawarkan berbagai paket dengan harga kompetitif yang dapat disesuaikan dengan anggaran bisnis Anda.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefit yang diberikan
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            X - Stresser menawarkan solusi cloud computing yang fleksibel dan efisien, dirancang untuk mendukung pertumbuhan bisnis Anda dengan teknologi terkini.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
