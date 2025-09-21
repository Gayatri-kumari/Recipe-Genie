import genie from '../assets/genie.png'
export default function Header()
{
    return (
        <>
        <header>
            <img src={genie} alt='Recipe Genie logo' title='Recipe Genie'/><span>Recipe Genie</span>
        </header>
        </>
    )
}