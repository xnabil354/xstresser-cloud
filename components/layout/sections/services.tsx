import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Cloud VPS",
    description:
      "Layanan VPS kami menawarkan kinerja tinggi dengan uptime hampir 100%, dilengkapi dengan berbagai opsi konfigurasi yang dapat disesuaikan dengan kebutuhan bisnis Anda.",
    pro: ProService.YES,
  },
  {
    title: "Remote Desktop Protocol (RDP)",
    description:
      "Layanan RDP kami memungkinkan Anda untuk mengakses desktop virtual dengan mudah dari mana saja, mendukung produktivitas dan fleksibilitas tim Anda.",
    pro: ProService.YES,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Services
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Grow Your IT Infrastructure
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Dengan layanan Cloud VPS dan RDP kami, nikmati kinerja tinggi dan fleksibilitas maksimal untuk mendukung pertumbuhan bisnis Anda.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            {pro === ProService.YES && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-3"
              >
                PRO
              </Badge>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};
