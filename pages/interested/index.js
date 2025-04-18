import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from "@components/Modal";
import Btn from '@components/Btn';
import languagePopupImg from '@Images/languagePopup.svg';
import { useTranslation } from 'next-i18next';
import { getLocaleProps } from "@helpers";

export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function Interested() {
  const [showModal, setShowModal] = useState(true);
  const { t } = useTranslation('common');
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    leadType: "enquiry",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
const [successMsg, setSuccessMsg] = useState("");
  

  const validate = () => {
    let errs = {};
    if (!form.name.trim()) errs.name = "Name is required"; 
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }
    
    return errs;
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://mazutwmwpbackend002.azurewebsites.net/wp-json/custom/v1/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Thank you! Your message has been sent.");
        handleClose();
        setForm({ name: "", phone: "", leadType: "enquiry" });
        setError({});
        router.push('/');
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    router.push('/');
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
      <Modal
        showModal={showModal}
        customStyles={customStyles}
        handleClose={handleClose}
        content={
          <form onSubmit={handleSubmit}>
            <div className='flex items-center sm:flex-row flex-col-reverse w-full'>
              <div className='w-full px-4 pb-4'>
                <div className='mb-2'>
                  <label className='mb-2 block'>{t('Loan.Name')}</label>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('Loan.Enter_Name')}
                    className='w-full rounded border border-[#d1cccc] p-2'
                  />
                  {error.name && <p className='text-red-600 text-sm mt-1'>{error.name}</p>}
                </div>
                <div className='mb-2'>
                  <label className='mb-2 block'>{t('Loan.Mobile_No')}</label>
                  <input
                    type='text'
                    name='phone'
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('Loan.Enter_Mobile_NO')}
                    className='w-full rounded border border-[#d1cccc] p-2'
                  />
                  {error.phone && <p className='text-red-600 text-sm mt-1'>{error.phone}</p>}
                </div>
                <div className='w-full mt-3'>
 
                <button type="submit"
                        className="bg-secondaryColor px-2 py-3 text-white 
                        text-center rounded-md w-full font-semibold cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : t('Home.Submit')}
                      </button>

                  {/* <Btn type="submit" text={ t('Home.Submit')} bgColor={true} /> */}
                </div>
                {successMsg && <p className="text-green-600 font-semibold mt-4 text-center">{successMsg}</p>}

              </div>
              <div className="sm:relative w-[329px] h-[223px] overflow-hidden">
                <Image
                  src={languagePopupImg}
                  layout='responsive'
                  width={610}
                  height={452}
                  className='languagePopupImg'
                  alt='languagePopupImg'
                />
              </div>
            </div>
          </form>
          
        }
        
      />
      


    </>
  );
}
