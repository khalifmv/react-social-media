import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAlert } from "react-alert";
import { submitPost } from "../../app/api/posts_api";
import { useDispatch } from "react-redux";
import {create} from "../../app/reducer/post_reducer"

export default function PostingForm() {
  const dispatch = useDispatch()
  const alert = useAlert();
  const [loading, setloading] = useState(false);

  function submit(e) {
    e.preventDefault();
    setloading(true);
    const componentModal = document.getElementById("modal-add-post");
    let judul = e.target.judul.value;
    let isi = e.target.isi.value;
    const body = {
      title: judul,
      body: isi,
      userId: 2020,
    }

    submitPost(JSON.stringify(body))
      .then((res) => {
        dispatch(create({data: body}))
        setloading(false);
        componentModal.classList.remove("modal-open");
        alert.show("Berhasil posting");
      })
      .catch((err) => {
        setloading(false);
        alert.show("Gagal posting");
      });
  }
  function switchModal(params) {
    const component = document.getElementById("modal-add-post");
    if (params) {
      component.classList.add("modal-open");
    } else {
      component.classList.remove("modal-open");
    }
  }
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img alt="socialmedia-asset" src="https://api.lorem.space/image/face?hash=33792020" />
          </div>
        </div>
        <div className="flex-1">
          <button
            onClick={() => switchModal(true)}
            F
            className="btn btn-ghost bg-secondary-content modal-button w-full"
          >
            Apa yang anda pikirkan?
          </button>
          <div id="modal-add-post" className="modal">
            <div className="modal-box relative">
              <button
                onClick={() => switchModal(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold">Posting sesuatu</h3>
              <form
                className="py-6"
                onSubmit={(e) => {
                  submit(e);
                }}
              >
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Judul</span>
                  </label>
                  <input
                    type="text"
                    name="judul"
                    required
                    placeholder="Judul Postingan"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Isi</span>
                  </label>
                  <textarea
                    name="isi"
                    required
                    className="textarea textarea-bordered h-24"
                    placeholder="Isi Postingan"
                  ></textarea>
                </div>
                <div className="pt-4">
                  {loading ? (
                    <button type="button" disabled className="btn loading">
                      loading
                    </button>
                  ) : (
                    <button type="submit" className="btn gap-2">
                      <PaperAirplaneIcon className="h-5 w-5" />
                      Posting
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
