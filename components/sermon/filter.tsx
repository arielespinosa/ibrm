"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import DialogCombobox, { DialogComboboxItems } from "@/components/ui/dialog-combobox";
import { CreateUpdateModalForm } from "@/components/forms/modal";
import { fetchPerson, fetchSermons, fetchSermonSeries } from "@/api/objects-fetcher";
import { Input } from "../ui/input";


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
  speaker_id?: number;
  serie_id?: number;
  is_on_straming?: boolean;
  is_current_dominical?: boolean;
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
  
  const buildFilters = (data: SermonFormData, useLike?: string[]) => {
    return Object.entries(data)
      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => (
        useLike && useLike.includes(key) ? {field: key, query: "like", value} : {field: key, value}
      ))
  }

  async function fetchSpeaker() {
    const data = await fetchPerson();
    setSpeaker(data.map(i => ({value: i.id.toString(), label: i.name})));    
  }

  async function fetchSeries() {
    const data = await fetchSermonSeries();
    setSerie(data.map(i => ({value: i.id.toString(), label: i.title})));    
  }

  async function filterSermons(data: SermonFormData) {
    let likes = [];
    if(data.title)
      likes.push("title")
    const filterData = buildFilters(data, likes);
    const filteredSermons = await fetchSermons({filter: filterData});
    return filteredSermons;
  }

  useEffect(() =>{
    fetchSpeaker();
    fetchSeries();
  }, [])

  
  const onSubmit = async (data: SermonFormData) => {
    setSubmitError(null);  
    console.log(data);
    
    try {
      const filteredSermons = filterSermons(data);
      console.log(filteredSermons);    
      setOpen(false);
    } catch (err: unknown) {
      console.error(err);
      const message = "No se pudo agregar la sesión práctica.";
      setSubmitError(message);
      //setError("instructor", { message });
    }
  }


  const renderBody = () => {
    return (
      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="instructor" className="text-white/70 text-sm">Expositor</Label>
          <Controller
            name="speaker_id"
            control={control}
            render={({ field }) => (
              <DialogCombobox
                placeholder="Seleccione un expositor"
                items={speaker}
                value={field.value?.toString() || null}
                onChange={(value) => field.onChange(value ? parseInt(value, 10) : null)}
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lesson" className="text-white/70 text-sm">Serie</Label>
          <Controller
            name="serie_id"
            control={control}
            render={({ field }) => (
              <DialogCombobox
                placeholder="Seleccione una serie"
                items={serie}
                value={field.value?.toString() || null}
                onChange={(value) => field.onChange(value ? parseInt(value, 10) : null)}
              />
            )}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register("title")} />
        </div>                    
      </div>
    )
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
