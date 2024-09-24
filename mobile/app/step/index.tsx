import { View, Text, Pressable, ScrollView } from "react-native";
import { Header } from "../../components/header/header";
import Input from "../../components/input/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { styles } from "./step.styles";
import React from "react";
import { router } from "expo-router";
import { useDataStore } from "../../store/data";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  weight: z.string().min(1, { message: "O peso é obrigatório" }),
  age: z.string().min(1, { message: "A idade é obrigatória" }),
  height: z.string().min(1, { message: "A altura é obrigatória" }),
});
type FormData = z.infer<typeof schema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageOne = useDataStore((state) => state.setPageOne);

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height,
    });
    router.push("/create");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite o seu nome"
          error={errors.name?.message}
          keyboardType="default"
        />

        <Text style={styles.label}>Peso</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 72"
          error={errors.weight?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Altura</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.81"
          error={errors.height?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Idade</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 33"
          error={errors.age?.message}
          keyboardType="numeric"
        />
        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
