import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const BIOGRAPHIES = [
    {
    name: "Pedro Francisco Pérez García",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/d2bfa3590_603054689_10239637937154575_4186765685569892296_n.jpg",
    content:`Pedro Francisco Pérez García sirve como pastor en la Iglesia Bautista Reformada de Murcia, donde desarrolla un ministerio centrado en la predicación expositiva de la Palabra de Dios,
    la enseñanza bíblica y el cuidado pastoral.Desde su ordenación en junio de 2025, ejerce su labor junto a otros ancianos dentro de un modelo de liderazgo plural, comprometido con la 
    fidelidad a las Escrituras y la edificación de la iglesia en la sana doctrina. Actualmente cursa estudios de Teología en el Seminario Reformado Latinoamericano (SRL), donde continúa 
    formándose con el propósito de profundizar en el conocimiento de Dios y en la correcta interpretación de Su Palabra.
    Tras experimentar de manera transformadora la gracia de Dios en su vida, fue llevado a un compromiso firme con la verdad del Evangelio y al servicio en el ministerio pastoral. Su 
    ministerio se caracteriza por un enfoque expositivo, procurando explicar el texto bíblico en su contexto y aplicar fielmente su mensaje, llamando a los creyentes a una fe sólida, 
    centrada en el Evangelio. Ha desarrollado una exposición completa de la carta a los Romanos y comparte enseñanzas bíblicas de manera sistemática a través de diferentes medios, 
    incluyendo series expositivas como el Evangelio de Juan y el Sermón del Monte.
    Además de su labor en la iglesia local, comparte contenido bíblico a través de plataformas digitales, con el propósito de instruir, exhortar y guiar a otros hacia una comprensión más 
    profunda de la verdad revelada en las Escrituras.
    Compagina su ministerio pastoral con su actividad profesional, procurando vivir de manera íntegra y coherente con el llamamiento recibido. Es padre de dos hijos.
    "Fiel a la Palabra, en todo tiempo y contra todo error."`},

    {
    name: "David Eduardo Martinez Cicchini",
    avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/be62c2002_634729718_10162168009566976_5993971085413391884_n.jpg",
    content:`David Eduardo Martinez Cicchini....sirve como pastor en la Iglesia Bautista Reformada de Murcia, donde desarrolla un ministerio centrado en la predicación expositiva de la Palabra de Dios,
    la enseñanza bíblica y el cuidado pastoral.Desde su ordenación en junio de 2025, ejerce su labor junto a otros ancianos dentro de un modelo de liderazgo plural, comprometido con la 
    fidelidad a las Escrituras y la edificación de la iglesia en la sana doctrina. Actualmente cursa estudios de Teología en el Seminario Reformado Latinoamericano (SRL), donde continúa 
    formándose con el propósito de profundizar en el conocimiento de Dios y en la correcta interpretación de Su Palabra.
    Tras experimentar de manera transformadora la gracia de Dios en su vida, fue llevado a un compromiso firme con la verdad del Evangelio y al servicio en el ministerio pastoral. Su 
    ministerio se caracteriza por un enfoque expositivo, procurando explicar el texto bíblico en su contexto y aplicar fielmente su mensaje, llamando a los creyentes a una fe sólida, 
    centrada en el Evangelio. Ha desarrollado una exposición completa de la carta a los Romanos y comparte enseñanzas bíblicas de manera sistemática a través de diferentes medios, 
    incluyendo series expositivas como el Evangelio de Juan y el Sermón del Monte.
    Además de su labor en la iglesia local, comparte contenido bíblico a través de plataformas digitales, con el propósito de instruir, exhortar y guiar a otros hacia una comprensión más 
    profunda de la verdad revelada en las Escrituras.
    Compagina su ministerio pastoral con su actividad profesional, procurando vivir de manera íntegra y coherente con el llamamiento recibido. Es padre de dos hijos.
    "Fiel a la Palabra, en todo tiempo y contra todo error."`},
]

export default function BiographyDialog({person, open, setOpen}:{person:number, open:boolean, setOpen:(value: boolean) => void}){

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent showCloseButton={false}  className="
            bg-[#0b0b0c] 
            border border-white/10 
            text-white 
            rounded-none
            shadow-xl
            w-full !max-w-6xl
            ">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center gap-3">
                        <Avatar className="w-15 h-15">
                          <AvatarImage src={BIOGRAPHIES[person].avatar} alt={BIOGRAPHIES[person].name} />
                          <AvatarFallback>{BIOGRAPHIES[person].name}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-white/80 text-sm font-medium">Pstr. {BIOGRAPHIES[person].name}</span>
                          <span className="text-[#c9a55a]/60 text-xs tracking-wide">pastor@gmail.com</span>
                        </div>
                      </div></DialogTitle>
                    <DialogDescription>
                       
                    </DialogDescription>
                </DialogHeader>            
                <p className="text-white/50 leading-relaxed mb-6">{BIOGRAPHIES[person].content}</p>
                <div className="flex justify-end mt-6">
                    <DialogClose asChild>
                        <Button type="button" onClick={() => setOpen(false)} className="rounded-none bg-[#c9a55a] text-black hover:bg-[#c9a55a]">
                        Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )

}