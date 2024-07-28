import { Button, Group, Stack, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentViewerProps {
    file: string; // URL to the PDF file
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ file }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <Stack gap="md" align="center">
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{
                    cMapUrl: "cmaps/",
                    cMapPacked: true,
                }}
            >
                <Page pageNumber={pageNumber} width={600} />
            </Document>
            <Text>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </Text>
            <Group>
                <Button onClick={previousPage} disabled={pageNumber <= 1} leftSection={<IconChevronLeft size={14} />}>
                    Previous
                </Button>
                <Button
                    onClick={nextPage}
                    disabled={numPages !== null && pageNumber >= numPages}
                    rightSection={<IconChevronRight size={14} />}
                >
                    Next
                </Button>
            </Group>
        </Stack>
    );
};

export default DocumentViewer;
