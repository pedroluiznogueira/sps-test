import { useContext, useEffect } from 'react';
import RepoContext from '../../context/RepoContext';
import '../repo/Repo.css';

function RepoList() {
    const {repos, foundRepo, found, deleteRepo} = useContext(RepoContext);

    const handleClick = (name) => {
        deleteRepo(name);
    }

    if (found) {
        return (
            <div className="repos-list">
            <h3>Repositórios</h3>
                <ul>
                    <li>
                        <div className="left-block">
                            <span className="repo-owner">
                                <b>{foundRepo.name}</b>
                            </span>
                            <span className="repo-name">
                                {foundRepo.owner}
                            </span>
                        </div>
                        <div className="right-block">
                        <i onClick={(name) => {handleClick(foundRepo.name)}} className="material-icons">delete</i>
                        </div>
                    </li>
                </ul>
            </div> 
        );
    }
    
    return (
        <div className="repos-list">
        <h3>Repositórios</h3>
            <ul>
                {repos.map((repo, index) => (
                <li>
                    <div className="left-block">
                        <span className="repo-owner">
                            <b key={index}>{repo.name}</b>
                        </span>
                        <span className="repo-name">
                            {repo.owner}
                        </span>
                    </div>
                    <div className="right-block">
                    <i onClick={(name) => {handleClick(repo.name)}} className="material-icons">delete</i>
                    </div>
                </li>
                ))}
            </ul>
        </div> 
    )
}

export default RepoList;
