import { useEffect, useState } from 'react';
import ipfsClient from 'ipfs-http-client';
import prettyBytes from 'pretty-bytes';
import { IPFS_CONNECTION_DETAILS } from '../config';

export const useIpfs = function () {

    const [ipfs, setIpfs] = useState(null);
    const [ipfsState, setIpfsState] = useState(false);

    useEffect(() => {
        let client = ipfsClient(IPFS_CONNECTION_DETAILS);
        setIpfs(client);

        client.id()
            .then((result) => {
                setIpfsState(true);
            })
            .catch((err) => {
                setIpfsState(false);
            });

        return () => {
            setIpfsState(false);
            setIpfs(null);
        };
    }, []);

    async function addToIpfs(file, options = null) {
        if (!options) {
            options = {
                progress: (prog) => console.log(`received: ${prettyBytes(prog)}`)
            };
        }
        const added = await ipfs.add(file, options);
        return added.cid.toString();
    }

    async function getCid(file) {
        return await addToIpfs(file, { onlyHash: true });
    }

    return { ipfsState, addToIpfs, getCid };
}