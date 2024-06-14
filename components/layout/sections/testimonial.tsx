"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://via.placeholder.com/150",
    name: "Ahmad",
    userName: "CEO Startup Tech",
    comment:
      "X - Stresser telah menjadi tulang punggung infrastruktur digital kami. Kinerja dan keamanan yang mereka tawarkan sangat luar biasa.",
    rating: 5.0,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Diana",
    userName: "Manajer IT",
    comment:
      "Layanan support mereka sangat responsif dan selalu siap membantu kami kapan saja. Sangat direkomendasikan!",
    rating: 5.0,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Bayu",
    userName: "Developer Freelance",
    comment:
      "Dengan X - Stresser, saya bisa mengembangkan aplikasi saya tanpa khawatir tentang downtime.",
    rating: 5.0,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Lina",
    userName: "Pemilik Toko Online",
    comment:
      "Layanan RDP mereka sangat membantu saya dalam mengelola bisnis saya dari jarak jauh.",
    rating: 5.0,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Rizky",
    userName: "Pengusaha",
    comment:
      "Skalabilitas yang ditawarkan X - Stresser sangat memudahkan bisnis kami untuk terus berkembang.",
    rating: 5.0,
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Sinta",
    userName: "Marketing Manager",
    comment:
      "Layanan mereka sangat andal dan mudah digunakan. Benar-benar membantu kami dalam berbagai proyek.",
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewList.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Hear What Our 100+ Clients Say
        </h2>
      </div>

      <div className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto">
        <Carousel>
          <CarouselContent className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {reviewList.map((review) => (
              <CarouselItem key={review.name} className="w-full p-2">
                <Card className="bg-muted/50 dark:bg-card">
                  <CardContent className="pt-6 pb-0">
                    <div className="flex gap-1 pb-6">
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                    </div>
                    {`"${review.comment}"`}
                  </CardContent>
                  <CardHeader>
                    <div className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>SV</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription>{review.userName}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewList.length) % reviewList.length)} />
        </Carousel>
      </div>
    </section>
  );
};