import { DataProps } from "../controllers/CreateTrainController";
import { GoogleGenerativeAI } from "@google/generative-ai";

class CreateTrainService {
  async execute({
    name,
    age,
    gender,
    weight,
    height,
    level,
    objective,
  }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const response = await model.generateContent(`
        Em português, crie um plano de treino personalizado para uma pessoa com as seguintes informações: 
        Nome: ${name}, Idade: ${age}, Gênero: ${gender}, Altura: ${height} cm, Peso: ${weight} kg, Level: ${level}, Objetivo: ${objective}.
        O plano deve incluir exercícios recomendados, número de séries e repetições para cada exercício, e dicas adicionais para alcançar o objetivo, sempre respeitando o a frequencia ${level}.
        Retorne em json dentro de data retorna as propriedades que o usuário mando e com o plano de treino de cada dia da semana dentro de um array contendo em cada objeto um treino para cada dia da semana. Como no
        exemplo abaixo:
        {
        nome: "${name}",
        idade: ${age},
        genero: "${gender}",
        altura: ${height},
        peso: ${weight},
        level: ${level},
        objetivo: "${objective}",
        treinos: [
          {"dia": "Segunda-feira", "exercicios": [ {"nome": "Agachamento", "series": 4, "repeticoes": 12}, {"nome": "Supino", "series": 4, "repeticoes": 10} ], "dicas": "Mantenha a postura correta durante os exercícios." },
          {"dia": "Terça-feira", "exercicios": [ {"nome": "Corrida", "series": 1, "repeticoes": "30 minutos"}, {"nome": "Abdominais", "series": 3, "repeticoes": 15} ], "dicas": "Hidrate-se bem antes e depois do treino." }
        ]
      }
      }
      `);

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;
        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();
        let jsonData = JSON.parse(jsonString);
        return { data: jsonData };
      }
      return { ok: true };
    } catch (error) {
      console.error("Error creating train:", error);
      throw new Error("Failed to create train");
    }
  }
}

export { CreateTrainService };
