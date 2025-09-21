import React  from "react";
import IngredientsList from './IngredientsList'
import { getRecipeFromAIModals} from "../ai";
import RecipeGenie from "./RecipeGenie";
export default function Main()
{   
    // state array to store the ingredients 
    const [ingredients,setIngredients]=React.useState([])
    //state for the alert message if ingredient exists
    const [ingredientExists, setIngredientExistsMsg] = React.useState("");
    //bool state for recipe
    const [recipe,setRecipe]=React.useState(false)
    //bool state to manage the time when recipe is loading
    const [recipeLoading,setRecipeLoading]=React.useState(false)
    //reference - mostly used for scroll into view
    const recipeRef=React.useRef(null)

    //Effects that scrolls to specifc sections at specific time
    React.useEffect(()=>{
       
        if(recipeLoading && recipeRef )
        {
            recipeRef.current.scrollIntoView({behaviour:'smooth'})
        }
    },[recipeLoading])
    React.useEffect(()=>{
        if(!recipeLoading && recipe)
        {
            recipeRef.current.scrollIntoView({behaviour:'smooth'})
        }
    },[recipe])

    //reloads - removes the ingredients and the recipe for a fresh start
    function reload()
    {
        setIngredients([]);
        if(recipe) {
            setRecipe(prevrecipe=>!prevrecipe);
        }
         
    }

    //function that fetches the recipe
    async function getRecipe()
    {
        setRecipeLoading(true)
        const generatedRecipe=await getRecipeFromAIModals(ingredients);
        setRecipe(generatedRecipe)
        setRecipeLoading(false)
    }
    
    //function to remove the ingredient
    function removeSingleIngredient(e)
    {
        const val=(e.target.value)
        const newing=ingredients.filter((item)=>item!=val)
        setIngredients(newing)   
    }

    //function to get and add the ingredient from the input text field to the ingredient array
    function getIngredients(formData){
        const newIngredient=formData.get("ingredientName");
        const isDuplicate=
            ingredients.some((item)=>{
                return newIngredient===item
            })

       //ingredient exists msg 
       if (isDuplicate) {
        setIngredientExistsMsg(`⚠️" ${(newIngredient)} " is already on your list. Please add a new ingredient.`);
        setTimeout(() => setIngredientExistsMsg(""), 3000); // auto clear
        return;
    }    
    setIngredients(
            (prevIng)=>{
                return [...prevIng,newIngredient]
            }
        )
    }

    //array that contains the jsx(markups) for ingredients and button to remove the ingredient
    const ingredientsJSX=ingredients.map((e)=><li key={e}><div className="listcontents">{e} <button className="remove" title="remove ingredient" onClick={removeSingleIngredient} value={e}>x</button></div></li>);

    return (
        <>
        <main>
            <div className="about">
            <h3> Welcome to Recipe Genie!</h3>
            Got random ingredients but not sure what to cook? Recipe Genie is here to help!<br/>
            Just type in what you've got, and let the Genie do its magic and generate a recipe suggestion for you.<br/> No fancy pantry needed - simply list your ingredients and hit Get Recipe to begin!
            </div>

            <div className="formList">
            <form action={getIngredients} className="inputField" id="ingredientForm"> 
            <input type='text' name="ingredientName" aria-label="Add ingredients" placeholder="e.g. tomato" 
                onInvalid={(e) =>{
                    e.target.setCustomValidity("Please enter an ingredient");
                    e.target.classList.add('error');
                    setTimeout(()=>e.target.classList.remove('error'),1000)
                }} 
                onInput={(e) => {e.target.setCustomValidity("");
                    
                }}
            required/>
            <button >+ Add ingredient</button>
             
             {ingredientExists && <p className="error-message" role="alert" aria-live="assertive">{ingredientExists}</p>}
            </form>

            </div>
            {ingredientsJSX.length>0 && <IngredientsList inglist={ingredientsJSX} getRecipe={getRecipe} reload={reload} recipeLoading={recipeLoading} ref={recipeRef}/>
            }

            {
            recipe&&
            <section>
                 
                <RecipeGenie recipe={recipe} recipeLoading={recipeLoading}/>
            </section>
            }
            <br/>
            <br/>
            <br/>
        </main>
    </>
    )
}


 /**
     * Review Challenge:
     * Map over the list of ingredients and render them as list items
     * 
     * Note: We're doing things a weird way here. Don't worry,
     * we're building up to learning the right way 🙂
     */


  //e.preventDefault();
       // const fd=new FormData(e.target);
     /* 
     
     <input type='text' name="ingredientName" aria-label="Add ingredients" placeholder="e.g. tomato" 
            onInvalid={(e) =>e.target.setCustomValidity("Please enter an ingredient")} 
            onInput={(e) => e.target.setCustomValidity("")}
            required/>

            onInvalid and onInput are js method vanilla js
            oninvalid helps in changing the tooltip value when
            someone tries to submit without filling the required entries

            */ 