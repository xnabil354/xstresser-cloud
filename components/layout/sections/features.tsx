import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as lucideIcons from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Cpu",
    title: "Resource Management",
    description:
      "Kemudahan dalam mengelola sumber daya sesuai kebutuhan bisnis Anda, memastikan efisiensi dan fleksibilitas.",
  },
  {
    icon: "Database",
    title: "Automated Backups",
    description:
      "Sistem backup otomatis untuk melindungi data penting Anda, memastikan keamanan dan pemulihan yang cepat.",
  },
  {
    icon: "Uptime",
    title: "High Availability",
    description:
      "Infrastruktur yang dirancang untuk memastikan ketersediaan layanan secara terus-menerus, tanpa downtime.",
  },
  {
    icon: "Devices",
    title: "Multi-OS Support",
    description:
      "Dukungan untuk berbagai sistem operasi, memberikan Anda kebebasan untuk memilih yang terbaik untuk kebutuhan Anda.",
  },
  {
    icon: "Shield",
    title: "Advanced Security",
    description:
      "Perlindungan berlapis untuk keamanan data dan privasi Anda, dengan teknologi terbaru dan terbaik.",
  },
  {
    icon: "Sliders",
    title: "User-Friendly Control Panel",
    description:
      "Antarmuka yang intuitif untuk memudahkan pengelolaan layanan Anda, memungkinkan kontrol penuh dengan mudah.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Fitur
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Apa yang Membuat Kami Berbeda
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Temukan keunggulan layanan cloud kami yang dirancang untuk memberikan performa, keamanan, dan kenyamanan terbaik.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => {
          const IconComponent = lucideIcons[icon as keyof typeof lucideIcons] as React.ElementType;
          return (
            <div key={title}>
              <Card className="h-full bg-background border-0 shadow-none">
                <CardHeader className="flex justify-center items-center">
                  <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                    {IconComponent && (
                      <IconComponent
                        size={24}
                        color="hsl(var(--primary))"
                        className="text-primary"
                      />
                    )}
                  </div>

                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="text-muted-foreground text-center">
                  {description}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};