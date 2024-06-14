import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Apa itu VPS dan RDP?",
    answer: "VPS (Virtual Private Server) adalah server virtual yang memberikan kebebasan dan kontrol seperti server fisik. RDP (Remote Desktop Protocol) adalah teknologi yang memungkinkan Anda mengakses komputer atau server dari jarak jauh.",
    value: "item-1",
  },
  {
    question: "Bagaimana cara memulai layanan di X - Stresser?",
    answer: "Anda bisa mengunjungi situs kami dan memilih paket yang sesuai dengan kebutuhan Anda. Setelah itu, tim kami akan membantu Anda dalam proses setup.",
    value: "item-2",
  },
  {
    question: "Apakah data saya aman di server X - Stresser?",
    answer: "Ya, kami menggunakan sistem keamanan berlapis untuk memastikan data Anda terlindungi dari berbagai ancaman.",
    value: "item-3",
  },
  {
    question: "Apakah saya bisa meng-upgrade paket layanan saya nanti?",
    answer: "Tentu saja, layanan kami dirancang untuk fleksibel dan dapat disesuaikan dengan kebutuhan bisnis Anda yang berkembang.",
    value: "item-4",
  },
  {
    question: "Bagaimana jika saya mengalami masalah teknis?",
    answer: "Tim dukungan kami tersedia 24/7 untuk membantu Anda mengatasi masalah teknis dengan cepat.",
    value: "item-5",
  },
  {
    question: "Apakah X - Stresser mendukung berbagai sistem operasi?",
    answer: "Ya, layanan kami mendukung berbagai sistem operasi seperti Windows, Linux, dan lainnya.",
    value: "item-6",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
