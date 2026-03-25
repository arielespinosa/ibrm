import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
// import { UseFormHandleSubmit } from "react-hook-form";

interface IModalForm {
	open: boolean;    
	title: string;
	description: string;
	body: any;
	setOpen: (value: boolean) => void
	onSubmit?: any;
	handleSubmit?: any; //UseFormHandleSubmit<T, T>;
}

export function ModalForm({title, description, body, onSubmit, handleSubmit}: IModalForm){
	const [open, setOpen] = useState(false)

	const handleFormSubmit = handleSubmit ? handleSubmit(async (data: any) => {
		await onSubmit?.(data)
		setOpen(false)
	}) : async (e: React.FormEvent) => {
		e.preventDefault()
		await onSubmit?.()
		setOpen(false)
	}
	
	return (
    <Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" aria-label="Submit" ><Plus /></Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleFormSubmit}>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						{body}
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline">Cancelar</Button>
						</DialogClose>
						<Button type="submit">Aceptar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
    </Dialog>
	)
}



export function CreateUpdateModalForm({open, title, description, body, setOpen, onSubmit, handleSubmit}: IModalForm){
	
	const handleFormSubmit = handleSubmit ? handleSubmit(async (data: any) => {
		await onSubmit?.(data)
		setOpen(false)
	}) : async (e: React.FormEvent) => {
		e.preventDefault()
		await onSubmit?.()
		setOpen(false)
	}
	
	return (
    <Dialog open={open} onOpenChange={setOpen}>			
		<DialogContent className="
            bg-[#0b0b0c] 
            border border-white/10 
            text-white 
            rounded-none
            shadow-xl
            "
        >
			<form onSubmit={handleFormSubmit}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="text-[#c9a55a]">{description}</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					{body}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline" className="rounded-none bg-white/5 hover:bg-white/5 text-white/40 hover:text-white border border-white/10 hover:border-white/30">Cancelar</Button>
					</DialogClose>
					<Button type="submit" className="rounded-none bg-[#c9a55a] hover:bg-[#c9a55a] hover: border-white/30  text-black/70 hover:text-black">
                        Aceptar
                    </Button>
				</DialogFooter>
			</form>
		</DialogContent>
    </Dialog>
	)
}
