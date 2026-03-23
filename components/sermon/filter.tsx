"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import DialogCombobox, { DialogComboboxItems } from "@/components/ui/dialog-combobox";
import { CreateUpdateModalForm } from "@/components/forms/modal";
import { fetchPerson, fetchSermonSeries } from "@/api/objects-fetcher";


interface ModalForm{
    open: boolean;
    setOpen: (value: boolean) => void;
}

export interface SermonFormData {
  title?: string;
  description?: string;
  date?: string;
  scripture?: string;
  duration?: string;
  speakerId?: number;
  serieId?: number;
  isOnStraming?: boolean;
  isCurrentDominical?: boolean;
}

export function FilterSermonModalForm({ open, setOpen }: ModalForm) {
  const [speaker, setSpeaker] = useState<DialogComboboxItems[]>([]);
  const [serie, setSerie] = useState<DialogComboboxItems[]>([]);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [scripture, setScripture] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, control } = useForm<SermonFormData>();
  
  async function fetchSpeaker() {
    const data = await fetchPerson();
    setSpeaker(data.map(i => ({value: i.id.toString(), label: i.name})));    
  }

  async function fetchSeries() {
    const data = await fetchSermonSeries();
    setSerie(data.map(i => ({value: i.id.toString(), label: i.title})));    
  }

  useEffect(() =>{
    fetchSpeaker();
    fetchSeries();
  }, [])

  const renderBody = () => {
    return (
      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="instructor" className="text-white/70 text-sm">Expositor</Label>
          <Controller
            name="speakerId"
            control={control}
            rules={{ required: "Debes seleccionar un expositor" }}
            render={({ field }) => (
              <DialogCombobox
                placeholder="Seleccione un expositor"
                items={speaker}
                value={field.value?.toString() || ""}
                onChange={(value) => field.onChange(value ? parseInt(value, 10) : undefined)}
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lesson" className="text-white/70 text-sm">Lección</Label>
          <Controller
            name="serieId"
            control={control}
            rules={{ required: "Debes seleccionar una serie" }}
            render={({ field }) => (
              <DialogCombobox
                placeholder="Seleccione una lección"
                items={serie}
                value={field.value?.toString() || ""}
                onChange={(value) => field.onChange(value ? parseInt(value, 10) : undefined)}
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="route">Ruta</Label>
        </div>                    
      </div>
    )
  }

  const onSubmit = async (data: SermonFormData) => {
    setSubmitError(null);  
    console.log(data);
    
    try {
      console.log("Sesión práctica creada exitosamente");
      setOpen(false);
    } catch (err: unknown) {
      console.error(err);
      const message = "No se pudo agregar la sesión práctica.";
      setSubmitError(message);
      //setError("instructor", { message });
    }
  }

  return (
    <CreateUpdateModalForm 
        open={open}
        setOpen={setOpen}
        title="Filtrar" 
        description="Encuentra el sermón que desees"
        body={renderBody()}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
    />
  );
}
