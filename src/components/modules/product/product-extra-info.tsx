import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ProductExtraInfo() {
  return (
    <div className="mt-8">
      <Accordion type="single" collapsible className="border-t border-border">
        <AccordionItem value="delivery"><AccordionTrigger>Delivery</AccordionTrigger><AccordionContent className="text-muted-foreground">Delivered in 2–4 business days inside Dhaka and 3–6 days elsewhere. Free delivery on orders over ৳3,000.</AccordionContent></AccordionItem>
        <AccordionItem value="returns"><AccordionTrigger>Returns & Exchange</AccordionTrigger><AccordionContent className="text-muted-foreground">Unworn items with tags can be returned or exchanged within 7 days of delivery.</AccordionContent></AccordionItem>
        <AccordionItem value="care"><AccordionTrigger>Care & Material</AccordionTrigger><AccordionContent className="text-muted-foreground">Shell 100% cotton denim, recycled polyester fill. Cold wash inside out, do not tumble dry.</AccordionContent></AccordionItem>
      </Accordion>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
        <div className="flex flex-col items-center gap-2"><Truck className="size-4 text-foreground" />Free delivery</div>
        <div className="flex flex-col items-center gap-2"><RotateCcw className="size-4 text-foreground" />Easy returns</div>
        <div className="flex flex-col items-center gap-2"><ShieldCheck className="size-4 text-foreground" />Secure payment</div>
      </div>
    </div>
  );
}
