// In-memory transfer of File objects between pages without sessionStorage quota limitations

let pendingFile: File | null = null

export function setPendingFile(file: File) {
    pendingFile = file
}

export function getPendingFile(): File | null {
    return pendingFile
}

export function clearPendingFile() {
    pendingFile = null
}
