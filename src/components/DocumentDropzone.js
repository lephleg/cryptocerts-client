import React, { forwardRef, useCallback, useMemo, useState, useImperativeHandle } from 'react'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useDropzone } from 'react-dropzone';
import prettyBytes from 'pretty-bytes';
import { red } from '@material-ui/core/colors';
import { FormControl } from '@material-ui/core';

const baseStyle = {
    alignItems: 'center',
    padding: '10px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#dddddd',
    borderStyle: 'dashed',
    backgroundColor: '#f1f1f1',
    color: '#bababa',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: "pointer"
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export const DocumentDropzone = forwardRef(({ handleSelectedFile }, ref) => {

    useImperativeHandle(ref, () => ({
        removeFile() {
            setSelectedFile(null);
        }
    }));

    const [selectedFile, setSelectedFile] = useState(null);

    const onDropAccepted = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
        var reader = new FileReader();
        reader.onloadend = function () {
            handleSelectedFile(Buffer(reader.result));
        };
        reader.readAsArrayBuffer(acceptedFiles[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        maxFiles: 1,
        accept: "application/pdf",
        onDropAccepted
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <FormControl>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <PictureAsPdfIcon fontSize="large" style={{ color: red[700] }} />
                <p>Drag 'n' drop a file here or click to select one</p>
            </div>
            {selectedFile && <aside>
                <h4>Selected file</h4>
                <div><span>{selectedFile.path} - {prettyBytes(selectedFile.size)}</span></div>
            </aside>}
        </FormControl>
    );
});
