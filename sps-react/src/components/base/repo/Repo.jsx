import React from "react";
import './Repo.css';
import RepoList from './../repo-list/RepoList';
import RepoForm from './../repo-form/RepoForm';

function RepoComponent() {

    return(
        <div className="container">
            <section id="sec" className="main">
                <RepoForm 
                    show={'Pesquisar'}
                    holder={'Encontre um repositório..'}
                />
                <RepoList />
            </section>
            
            <section className="bottom">
                <RepoForm 
                    show={'Adicionar'}
                    holder={'Insira a url de um repositório..'}
                />
            </section>
        </div>
    );
}

export default RepoComponent;
