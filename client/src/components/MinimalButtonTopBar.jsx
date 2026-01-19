import '../styles/MinimalButton.css'

function MinimalButton({children})
{
    return(
        <>
            <button className="MinimalButton">{children}</button>
        </>
    )
}
export default MinimalButton;