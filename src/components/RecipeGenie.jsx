import ReactMarkdown from 'react-markdown'
export default function RecipeGenie(props)
{   
 
const cleanedRecipe = props.recipe
  // Remove model tokens like <s>, [INST], [/INST], [B_INST], etc.
  .replace(/<\/?s>/g, "")
  .replace(/\[\/?B?_?INST\]/g, "")
  // Remove extra code blocks if any
  .replace(/```[\s\S]*?```/g, match => {
    return match.replace(/```(markdown)?/, "").replace(/```$/, "");
  })
  .trim();
return( 
<section className='suggested-recipe-container' style={{ opacity: props.recipeLoading ? 0.4 : 1 }}>
    
     <ReactMarkdown>{cleanedRecipe}</ReactMarkdown>
    

    </section>
)
}