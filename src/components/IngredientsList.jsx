export default function IngredientsList(props)
{
    return (
        <section>
            <h2>Ingredients on hand: </h2>
            <button className="reset-btn " onClick={props.reload} disabled={props.recipeLoading}  aria-label="Reset all ingredients and start over"
             title="Start Over">
              <svg xmlns="http://www.w3.org/2000/svg" className="reset-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
              Start Over
            </button>
            {props.inglist.length<4 && <p className="hint-text">✨ Add at least 4 ingredients to get a recipe suggestion!<br/>
            <span key={4 - props.inglist.length}>
            You need <strong>{4 - props.inglist.length}</strong> more ingredient{4 - props.inglist.length > 1 ? "s" : ""}.
            </span>
            </p>}

            <ul className="ingredients-list" aria-live="polite">{props.inglist}</ul>
            {props.inglist.length>3 && <div className="get-recipe-container" ref={props.ref}>
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe} disabled={props.recipeLoading}>Get a recipe</button>
                
            </div>}

            {props.recipeLoading && (
              <div className="loading-container">
                <div className="loading-bars">
                  <span></span><span></span><span></span>
                </div>
                <p>Generating your recipe...</p>
              </div>
            )}
        </section>
    ) 
}