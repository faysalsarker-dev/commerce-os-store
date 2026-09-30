import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { PromoPopupProps } from "@/types/nav-item.type";
import { AppImage } from "@/shared/app-image";
import { AppLink } from "@/shared/app-link";

export function PromoPopup({ popup }: PromoPopupProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!popup.isActive) return;
    const timer = window.setTimeout(() => setOpen(true), 1500);
    return () => window.clearTimeout(timer);
  }, [popup.isActive]);

  if (!popup.isActive) return null;

  const copyCoupon = async () => {
    if (!popup.couponCode) return;
    await navigator.clipboard?.writeText(popup.couponCode);
    setCopied(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto p-0 shadow-none sm:rounded-none">
        <div className="grid md:grid-cols-2">
          {popup.image && <AppImage src={popup.image} alt="New season clothing preview" className="hidden h-full min-h-[430px] w-full object-cover md:block" />}
          <div className="flex flex-col justify-center p-7 md:p-10">
            <DialogHeader className="text-left"><p className="mb-2 text-xs uppercase text-muted-foreground">Your first order</p><DialogTitle className="text-3xl font-semibold leading-tight">{popup.title}</DialogTitle><DialogDescription className="pt-3 leading-6">{popup.description}</DialogDescription></DialogHeader>
            {popup.couponCode && <div className="mt-6 flex items-center justify-between border border-dashed border-border bg-secondary/60 px-4 py-3"><span className="font-mono text-sm font-semibold tracking-[0.16em]">{popup.couponCode}</span><Button type="button" variant="ghost" size="sm" onClick={copyCoupon}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy"}</Button></div>}
            <Button asChild size="lg" className="mt-5"><AppLink href={popup.ctaLink} onClick={() => setOpen(false)}>{popup.ctaLabel}</AppLink></Button>
            <DialogClose asChild><Button variant="link" className="mt-2 text-muted-foreground">No thanks</Button></DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
