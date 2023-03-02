import React, { FormEvent, useState } from 'react';
import { OperationOnCredentials } from '../types/OperationOnCredentials';

/**
 * A React component used to display a form asking for the credentials
 * 
 * @param onSubmit - A callback for when the form is submitted, of this form: function(publicKey, privateKey)
 */
function CredentialsForm(props: { onSubmit: OperationOnCredentials }) {
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setprivateKey] = useState('');

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        props.onSubmit(publicKey, privateKey);
    }

    return <form className="row text-light text-start" onSubmit={handleOnSubmit}>
        <div className="mb-3">
            <label htmlFor="publicKeyInput" className="form-label">Public Key :</label>
            <input type="text" className="form-control" id="publicKeyInput" onChange={(event) => setPublicKey(event.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="privateKeyInput" className="form-label">Private Key :</label>
            <input type="password" className="form-control" id="privateKeyInput" onChange={(event) => setprivateKey(event.target.value)} />
        </div>
        <div className="mt-5 text-center ">
            <button type="submit" className="btn btn-lg btn-primary rounded-pill hover-zoom-shine mb-3"><strong>Confirm credentials</strong></button>
        </div>
    </form>

}

export default CredentialsForm;