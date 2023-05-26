import React, { useState, useEffect, useContext } from 'react';
import TabsContext from '../TabsContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import axios from 'axios';
import Cookies from 'js-cookie';


export function DocTab(value) {
  const { tabs, setTabs, addTab } = useContext(TabsContext);

  addTab({ value: value })
  return (
    // add a doc tab
    <div></div>
  );
}

export function PDFViewer() {
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  useEffect(() => {
    fetchPDFFile(); // 在组件加载时获取PDF文件
  }, []);

  const fetchPDFFile = async () => {
    try {
      const token = Cookies.get('authToken');
      // TODO: change pdf path
      const response = await axios.get('/path/to/pdf/file', {
        responseType: 'blob',
        withCredentials: true, // 发送请求时带上cookie
        // 可选：如果需要传递其他请求头或参数，请在这里添加
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        setFileUrl(url);
      } else {
        console.error('Failed to fetch PDF file');
      }
    } catch (error) {
      console.error('Error while fetching PDF file:', error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-4/5 h-96 border border-gray-300">
        {fileUrl && (
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width="100%" />
          </Document>
        )}
      </div>
      <div className="mt-2">
        {fileUrl && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
        {fileUrl && pageNumber > 1 && (
          <button
            onClick={() => setPageNumber((prevPageNumber) => prevPageNumber - 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
        )}
        {fileUrl && pageNumber < numPages && (
          <button
            onClick={() => setPageNumber((prevPageNumber) => prevPageNumber + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );


}
