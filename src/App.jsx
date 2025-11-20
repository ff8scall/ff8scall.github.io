import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import LengthConverter from './pages/LengthConverter';
import WeightConverter from './pages/WeightConverter';
import LoanCalculator from './pages/LoanCalculator';
import DateCalculator from './pages/DateCalculator';
import WordCounter from './pages/WordCounter';
import CurrencyConverter from './pages/CurrencyConverter';
import UnicodeConverter from './pages/UnicodeConverter';
import LottoGenerator from './pages/LottoGenerator';
import SpecialCharacters from './pages/SpecialCharacters';
import AsciiTable from './pages/AsciiTable';
import ColorPicker from './pages/ColorPicker';
import IpAddress from './pages/IpAddress';
import Flashlight from './pages/Flashlight';
import QrGenerator from './pages/QrGenerator';
import BarcodeGenerator from './pages/BarcodeGenerator';
import StringConverter from './pages/StringConverter';
import HtmlFormatter from './pages/HtmlFormatter';
import CodeDiff from './pages/CodeDiff';
import Checklist from './pages/Checklist';
import WebEditor from './pages/WebEditor';
import ImageToBase64 from './pages/ImageToBase64';
import AsciiArt from './pages/AsciiArt';
import Base64Tool from './pages/Base64Tool';
import PasswordGenerator from './pages/PasswordGenerator';
import BloodType from './pages/BloodType';
import JsonFormatter from './pages/JsonFormatter';
import WorkHoursCalculator from './pages/WorkHoursCalculator';
import SalaryCalculator from './pages/SalaryCalculator';
import HashGenerator from './pages/HashGenerator';
import UuidGenerator from './pages/UuidGenerator';
import AgeCalculator from './pages/AgeCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import HtmlEncoder from './pages/HtmlEncoder';
import TimerStopwatch from './pages/TimerStopwatch';
import MbtiTest from './pages/MbtiTest';
import ImageResizer from './pages/ImageResizer';
import BaseConverter from './pages/BaseConverter';
import YoutubeThumbnail from './pages/YoutubeThumbnail';
import MarkdownEditor from './pages/MarkdownEditor';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/length" element={<LengthConverter />} />
              <Route path="/weight" element={<WeightConverter />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/date" element={<DateCalculator />} />
              <Route path="/word-count" element={<WordCounter />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/unicode" element={<UnicodeConverter />} />
              <Route path="/lotto" element={<LottoGenerator />} />
              <Route path="/special-char" element={<SpecialCharacters />} />
              <Route path="/ascii-table" element={<AsciiTable />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/ip-address" element={<IpAddress />} />
              <Route path="/flashlight" element={<Flashlight />} />
              <Route path="/qr-gen" element={<QrGenerator />} />
              <Route path="/barcode-gen" element={<BarcodeGenerator />} />
              <Route path="/string-converter" element={<StringConverter />} />
              <Route path="/html-view" element={<HtmlFormatter />} />
              <Route path="/diff" element={<CodeDiff />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/web-editor" element={<WebEditor />} />
              <Route path="/image-base64" element={<ImageToBase64 />} />
              <Route path="/ascii-art" element={<AsciiArt />} />
              <Route path="/base64" element={<Base64Tool />} />
              <Route path="/password-gen" element={<PasswordGenerator />} />
              <Route path="/blood-type" element={<BloodType />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/work-hours" element={<WorkHoursCalculator />} />
              <Route path="/salary-calc" element={<SalaryCalculator />} />
              <Route path="/hash-gen" element={<HashGenerator />} />
              <Route path="/uuid-gen" element={<UuidGenerator />} />
              <Route path="/age-calc" element={<AgeCalculator />} />
              <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/html-encoder" element={<HtmlEncoder />} />
              <Route path="/timer" element={<TimerStopwatch />} />
              <Route path="/mbti-test" element={<MbtiTest />} />
              <Route path="/image-resize" element={<ImageResizer />} />
              <Route path="/base-converter" element={<BaseConverter />} />
              <Route path="/youtube-thumbnail" element={<YoutubeThumbnail />} />
              <Route path="/markdown-editor" element={<MarkdownEditor />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
