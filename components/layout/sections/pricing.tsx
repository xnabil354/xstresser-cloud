import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import OrderButton from "../../ui/OrderButton"; // Import OrderButton

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const vpsPlans: PlanProps[] = [
  {
    title: "Go-Lite",
    popular: PopularPlan.NO,
    price: 20000,
    description: "Paket ini cocok untuk kamu yang butuh performa stabil untuk pekerjaan harian atau belajar. Hemat di kantong tapi tetap bertenaga!",
    buttonText: "Order Now",
    benefitList: [
      "1 vCPU",
      "1 GB Memory",
      "25 GB NVMe Storage",
      "2 TB Bandwidth",
    ],
  },
  {
    title: "PowerBoost",
    popular: PopularPlan.NO,
    price: 40000,
    description: "Buat kamu yang butuh lebih banyak power untuk project coding, gaming, atau tugas berat lainnya. Kinerja lebih cepat dengan harga yang masih terjangkau!",
    buttonText: "Order Now",
    benefitList: [
      "2 vCPUs",
      "2 GB Memory",
      "60 GB NVMe Storage",
      "4 TB Bandwidth",
    ],
  },
  {
    title: "UltraX",
    popular: PopularPlan.YES,
    price: 60000,
    description: "Ini untuk kamu yang butuh performa ekstra dan storage besar. Ideal untuk proyek besar atau server game yang memerlukan resource tinggi!",
    buttonText: "Order Now",
    benefitList: [
      "2 vCPUs",
      "4 GB Memory",
      "100 GB NVMe Storage",
      "5 TB Bandwidth",
    ],
  },
  {
    title: "SuperX",
    popular: PopularPlan.NO,
    price: 80000,
    description: "Ini untuk kamu yang mau level up ke level selanjutnya. Dengan paket ini, kamu bisa menjalankan aplikasi atau game yang paling berat sekalipun. Performa super dengan harga super!",
    buttonText: "Order Now",
    benefitList: [
      "4 vCPUs",
      "8 GB Memory",
      "180 GB NVMe Storage",
      "6 TB Bandwidth",
    ],
  },
  {
    title: "MegaX",
    popular: PopularPlan.NO,
    price: 100000,
    description: "Ini untuk kamu yang tidak mau kompromi dengan kualitas. Dengan paket ini, kamu bisa memiliki server VPS yang paling canggih dan luas di XStresser. Tidak ada yang bisa mengalahkan paket ini!",
    buttonText: "Order Now",
    benefitList: [
      "4 vCPUs",
      "12 GB Memory",
      "260 GB NVMe Storage",
      "7 TB Bandwidth",
    ],
  },
  {
    title: "GigaX",
    popular: PopularPlan.NO,
    price: 150000,
    description: "Ini untuk kamu yang ingin menjadi raja di dunia digital. Dengan paket ini, kamu bisa memiliki server VPS yang paling powerful dan besar di XStresser. Tidak ada yang bisa menandingi paket ini!",
    buttonText: "Order Now",
    benefitList: [
      "8 vCPUs",
      "16 GB Memory",
      "350 GB NVMe Storage",
      "8 TB Bandwidth",
    ],
  },
];

const rdpPlans: PlanProps[] = [
  {
    title: "Go-Lite",
    popular: PopularPlan.NO,
    price: 30000,
    description: "Paket ini cocok buat kamu yang butuh performa stabil untuk pekerjaan harian atau belajar. Hemat di kantong tapi tetap bertenaga!",
    buttonText: "Order Now",
    benefitList: [
      "1 vCPU",
      "2 GB Memory",
      "50 GB NVMe Storage",
      "3 TB Bandwidth",
    ],
  },
  {
    title: "PowerBoost",
    popular: PopularPlan.NO,
    price: 50000,
    description: "Buat kamu yang butuh lebih banyak power untuk project coding, gaming, atau tugas berat lainnya. Kinerja lebih cepat dengan harga yang masih terjangkau!",
    buttonText: "Order Now",
    benefitList: [
      "2 vCPUs",
      "2 GB Memory",
      "60 GB NVMe Storage",
      "4 TB Bandwidth",
    ],
  },
  {
    title: "UltraX",
    popular: PopularPlan.YES,
    price: 70000,
    description: "Ini untuk kamu yang butuh performa ekstra dan storage besar. Ideal untuk proyek besar atau server game yang memerlukan resource tinggi!",
    buttonText: "Order Now",
    benefitList: [
      "2 vCPUs",
      "4 GB Memory",
      "100 GB NVMe Storage",
      "5 TB Bandwidth",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section id="price" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Get unlimited access
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Choose the best plan that suits your needs and budget.
      </h3>

      <h2 className="text-2xl md:text-3xl text-center font-bold mb-8">
        VPS Plans
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 mb-16">
        {vpsPlans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">Rp. {price.toLocaleString("id-ID")}</span>
                  <span className="text-muted-foreground"> /bulan</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <OrderButton
                  buttonText={buttonText}
                  link="https://t.me/cloud_xstresser_bot"
                  variant={popular === PopularPlan?.YES ? "default" : "secondary"}
                />
              </CardFooter>
            </Card>
          )
        )}
      </div>

      <h2 className="text-2xl md:text-3xl text-center font-bold mb-8">
        RDP Plans
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {rdpPlans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">Rp. {price.toLocaleString("id-ID")}</span>
                  <span className="text-muted-foreground"> /bulan</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <OrderButton
                  buttonText={buttonText}
                  link="https://t.me/cloud_xstresser_bot"
                  variant={popular === PopularPlan?.YES ? "default" : "secondary"}
                />
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
