import React, { useState, useEffect, useContext } from 'react';
import TabsContext from '../TabsContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PDF_REQ_URL } from '../config';
import '../../css/pdfViewer.css'
import { IconButton, Typography, Input } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon  } from "@heroicons/react/24/outline";


export function DocTab(value) {
  const { tabs, setTabs, addTab } = useContext(TabsContext);

  addTab({ value: value })
  return (
    // add a doc tab
    <div></div>
  );
}


export function PDFViewer({ fileName }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);

  const next = () => {
    if (pageNumber === numPages) return;

    setPageNumber(pageNumber + 1);
  };

  const prev = () => {
    if (pageNumber === 1) return;

    setPageNumber(pageNumber - 1);
  };

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  useEffect(() => {
    fetchPDFFile(); // 在组件加载时获取PDF文件
  }, []);

  const fetchPDFFile = async () => {
    try {
      const token = Cookies.get('authToken');
      // TODO: change pdf path
      const response = await axios.get(PDF_REQ_URL, {
        responseType: 'blob',
        withCredentials: true, // 发送请求时带上cookie
        // 可选：如果需要传递其他请求头或参数，请在这里添加
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          fileName: fileName,
        }
      });

      if (response.status === 200) {
        console.log(response.data)
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
    console.log('onDocumentLoadSuccess');
    setNumPages(numPages);
  };

  const pageZoomOut = () => {
    setPageWidth(pageWidth*0.8 < 300 ? 300 : pageWidth*0.8);
  };

  const pageZoomIn = () => {
    setPageWidth(pageWidth*1.2 > 900 ? 900 : pageWidth*1.2);
    console.log(pageWidth)
  };

  const pageFullscreen = () => {
    if (this.state.fullscreen) {
      this.setState({ fullscreen: false, pageWidth: 600 });
    } else {
      this.setState({ fullscreen: true, pageWidth: window.screen.width - 40 });
    }
  };

  return (
    <div className="flex items-top justify-center min-h-screen bg-gray-100">
      <div className="w-5/6 border border-gray-300">
        <div className="PDFViewer">
          {/* <header>
            <h1>react-pdf sample page</h1>
          </header> */}
          <div className="PDFViewer__container">
            <div className="PDFViewer__container__document">
              <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page key={`page_${pageNumber}`} pageNumber={pageNumber} width={pageWidth}/>
              </Document>
            </div>
            <div className="flex items-center gap-8">
              <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={pageZoomOut}
              >
                <MagnifyingGlassMinusIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={prev}
                disabled={pageNumber === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page <strong className="text-blue-gray-900">{pageNumber}</strong> of{" "}
                <strong className="text-blue-gray-900">{numPages}</strong>
              </Typography>
              <IconButton
                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={next}
                disabled={pageNumber === numPages}
              >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <IconButton

                size="sm"
                variant="outlined"
                color="blue-gray"
                onClick={pageZoomIn}
              >
                <MagnifyingGlassPlusIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>

            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
