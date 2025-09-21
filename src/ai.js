const HUGGING_FACE_API_KEY= import.meta.env.VITE_HUGGINGFACE;
const OPENROUTER_API_KEY= import.meta.env.VITE_OPENROUTER;
 
const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients from a user and suggests a recipe they could make using some or all of them. It's okay to include additional ingredients, but try to keep them minimal.
Please always format your response in markdown for easy rendering on a web page.
Your reply should start with:
"Based on the ingredients you have, I recommend this particular dish — [Dish Name]"

Then include the recipe with the dish name as a markdown heading (# always). Also, if possible, provide a relevant video link to help the user cook the dish.And It would be a plus if u add the calories count too with the total calories right beside the heading in brackets`;



export async function getRecipeFromAIModals(ingredientsArr) {
  console.log('Getting recipe for ingredients:', ingredientsArr);
  
  const ingredientsString = ingredientsArr.join(", ");
    try {
       
      
      const payload = {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `I have these ingredients: ${ingredientsString}. Please suggest a recipe.`
          }
        ],
        max_tokens: 1024,
       
      };

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify(payload),
        }
      );
 

      const data = await response.json();
      console.log('API Response:', data);
      return data.choices[0].message.content || "😕 Sorry, I couldn't whip up a recipe with those ingredients right now. Try adding more ingredients or tweaking your list a bit! "
      
    } catch (err) {
       console.error("Error fetching recipe from Mistral via OpenRouter:", err);
        return "⚠️ Error getting recipe. Please try again.";
    }
}

 
/*
hugging face modal code

export async function getRecipeFromMistral(ingredientsArr) {
  console.log('Getting recipe for ingredients:', ingredientsArr);
  
  const ingredientsString = ingredientsArr.join(", ");
  
  // Try Devstral first, then fallback to other models
  const availableModels = [
    "mistralai/Devstral-Small-2507",
    "meta-llama/Llama-2-7b-chat-hf",
    "meta-llama/Llama-3-8B-Instruct",
    "mistralai/Mistral-7B-Instruct-v0.1"
  ];

  for (const model of availableModels) {
    try {
      console.log(`Trying model: ${model}`);
      
      const payload = {
        model: model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `I have these ingredients: ${ingredientsString}. Please suggest a recipe.`
          }
        ],
        max_tokens: 1024,
        temperature: 0.7,
      };

      const response = await fetch(
        "https://router.huggingface.co/featherless-ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Model ${model} failed with status ${response.status}: ${errorText}`);
        continue; // Try next model
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        console.log(`Successfully used model: ${model}`);
        return data.choices[0].message.content;
      } else {
        console.log(`Model ${model} returned unexpected format`);
        continue;
      }
      
    } catch (err) {
      console.error(`Error with model ${model}:`, err.message);
      continue; // Try next model
    }
  }
  
  return "😕 Sorry, I couldn't whip up a recipe with those ingredients right now. Try adding more ingredients or tweaking your list a bit!";
}

 */