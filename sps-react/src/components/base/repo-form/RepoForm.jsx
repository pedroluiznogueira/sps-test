import { useContext, useState } from 'react';
import RepoContext from '../../context/RepoContext';
import '../repo/Repo.css';
import spinner from '../../shared/assets/spinner.gif';

function RepoForm( {show, holder} ) {
    const [text, setText] = useState('');
    const {addRepo, findRepo} = useContext(RepoContext);
    const [isLoading, setIsLoading] = useState(false);

    // setTimeout used only to simulate server response
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (show == 'Adicionar') {
            const promise = addRepo(text);
            promise
            .then(
                (data) => {
                    setTimeout(() => {setIsLoading(false)}, 2000)
                }
            )
            .catch(
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            );
        } else {
            const promise = findRepo(text);
            promise
            .then(
                (data) => {
                    setTimeout(() => {setIsLoading(false)}, 2000)
                }
            )
            .catch(
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000)
            );
        }
        
        setText('');
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <form 
        className="d-flex justify-content-center"
        onSubmit={handleSubmit}
        >
            <span className="text">{show}</span>
            <input
                onChange={handleChange}
                id="search"
                className="new-repo-input" 
                placeholder={holder}
                value={text} 
            />
            {
                isLoading ?
                <img 
                    src={spinner}
                    style={{width: '30px'}}
                /> : 
                <button className="new-repo-button">{show}</button>
            }   
        </form>
    )
}

export default RepoForm;
