import { createContext, useState, useEffect } from 'react';
import { extractNameAndOwner } from '../shared/functions/ExtractNameAndOwner';

const RepoContext = createContext();

export const RepoProvider = ( {children} ) => {
    const [repos, setRepos] = useState([]);
    const [found, setFound] = useState(false);
    const [foundRepo, setFoundRepo] = useState([]);

    useEffect(() => {
        fetchRepos();
    }, []);

    const fetchRepos = async () => {
        const user = JSON.parse(window.sessionStorage.getItem('logged'));
        const token = window.sessionStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/repos/find/all/${user._id}`, {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setRepos(data.repos);
    };

    const addRepo = async (repoUrl) => {
        const user = JSON.parse(window.sessionStorage.getItem('logged'));
        const token = window.sessionStorage.getItem('token');
        const reposAdd = extractNameAndOwner(repoUrl);
        
        const response = await fetch(`http://localhost:3000/repos/add/${user._id}`, {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reposAdd)
        });
        const data = await response.json();
        setRepos([data.repo, ...repos]);
        return data;
        
    };

    const findRepo = async (repoName) => {
        const user = JSON.parse(window.sessionStorage.getItem('logged'));
        const token = window.sessionStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/repos/find/by/name/${repoName}/by/id/${user._id}`,{
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setFound(true);
        setFoundRepo(data.foundRepo);
        return data;
    }

    const deleteRepo = async (repoName) => {
        const user = JSON.parse(window.sessionStorage.getItem('logged'));
        const token = window.sessionStorage.getItem('token');

        if (window.confirm('Are you sure you want to delete it ?')) {
                                        // /delete/by/name/:name/by/id/:id
            const response = await fetch(`http://localhost:3000/repos/delete/by/name/${repoName}/by/id/${user._id}`,{
                method: 'DELETE',
                headers: { 
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setRepos(repos.filter((repo) => repo.name !== data.repo.name));
        }
    }

    return(
        <RepoContext.Provider value={{
            repos: repos,
            foundRepo: foundRepo,
            found: found,
            addRepo: addRepo,
            findRepo: findRepo,
            deleteRepo: deleteRepo
        }}>
            {children}
        </RepoContext.Provider>
    );
}

export default RepoContext;