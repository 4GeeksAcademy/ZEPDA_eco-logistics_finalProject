import React from "react";
import "../../styles/dashboardEmpresa.css"

const dashboardEmpresa = ({empresa}) => {
  return (
    <div className="dashboardEmpresa">
      <div className="left">
        <div className="sidebar">
          <div className="wrapper">
            <div className="menu">
              <img src="https://i.ibb.co/B4Dn7CT/menu.png" />
            </div>
            <div className="items">
              <img src="https://i.ibb.co/L8D5T60/light.png" />
              <img src="https://i.ibb.co/zmDbMVZ/diamond.png" />
              <img src="https://i.ibb.co/W5QZ9Fk/envelope.png" />
              <img src="https://i.ibb.co/CnKDBxC/flask.png" />
              <img src="https://i.ibb.co/MGs4Fyn/sent-mail.png" />
              <img src="https://i.ibb.co/zGtDpcp/map.png" />
            </div>
            <div className="profile">
              <img src="https://www.seekclipart.com/clipng/middle/103-1032140_graphic-transparent-1-vector-flat-small-user-icon.png" />
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="wrapper2">
            <button className="compose mt-3">
              Nuevo Mail Empresa
              <span className="plus">
                <img src="https://i.ibb.co/v1HxGWj/add-1.png" />
              </span>
            </button>
            <div className="folders">Carpetas</div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/qdgf3TJ/envelope.png" />
              </div>
              <div className="icon-name1">
                Buzon de empresa
                <button className="buton-span"> 5</button>
              </div>
            </div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/2yLfX9W/sent-mail.png" />
              </div>
              <div className="icon-name">Enviar Mail</div>
            </div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/6ZH9kK3/star.png" />
              </div>
              <div className="icon-name">Importante</div>
            </div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/z4QhcbD/email.png" />
              </div>
              <div className="icon-name">Borradores</div>
            </div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/3MzfGDF/bug.png" />
              </div>
              <div className="icon-name">Spam</div>
            </div>
            <div className="folder-icons">
              <div className="icon1">
                <img src="https://i.ibb.co/xfcFLCN/waste-bin.png" />
              </div>
              <div className="icon-name">Papelera</div>
            </div>
            <div className="folders">Online Friends</div>
            <div className="folder-icons">
              <div className="avatar">
                <div className="online"></div>
                <img src="https://randomuser.me/api/portraits/women/64.jpg" />
              </div>
              <div className="names">Gabriella</div>
            </div>
            <div className="folder-icons">
              <div className="avatar">
                <div className="online red"></div>
                <img src="https://randomuser.me/api/portraits/men/79.jpg" />
              </div>
              <div className="names">ZAS</div>
            </div>
            <div className="folder-icons">
              <div className="avatar">
                <div className="online"></div>
                <img src="https://randomuser.me/api/portraits/men/20.jpg" />
              </div>
              <div className="names">Alan M.</div>
            </div>
            <div className="folders">#Tags</div>
            <div className="section1">
              <button className="btn buton1 mx-3">
                {" "}
                Important
                <span className="tag">
                  <img src="https://i.ibb.co/Zdx3jGx/tag.png" />
                </span>
              </button>

              <button className="btn buton2">
                {" "}
                New
                <span className="tag">
                  <img src="https://i.ibb.co/N1SMfgQ/tag.png" />
                </span>
              </button>
            </div>
            <div className="section2">
              <button className="btn buton3 mx-3">
                {" "}
                Old
                <span className="tag">
                  <img src="https://i.ibb.co/C5q0MDM/tag.png" />
                </span>
              </button>
              <button className="btn buton4">
                {" "}
                Priority
                <span className="tag">
                  <img src="https://i.ibb.co/DMmSZW0/tag.png" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-header">
          <div className="top-bar">
            <div className="top-bar-justify">
              <div className="big-inbox">Buzon</div>

              <div className="top-bar-items">
                <div className="notif">
                  <div className="online pink"></div>
                  <img src="https://i.ibb.co/VJm73Hz/notifications-button.png" />
                </div>
                <img src="https://i.ibb.co/vz4HYJb/envelope.png" />
                <img src="https://i.ibb.co/52Vkq4M/earth-globe.png" />
                <div className="icon-name5"> English </div>
              </div>
            </div>
            <div className="profile2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxskBELKkcItHXQFVTYI5p3_413uobvl2BHJLEM7PNg4cag9-l6n2mydDwws1CjV0ZTjw&usqp=CAU" />
              <div className="icon-name5">{empresa}</div>
            </div>
          </div>
          <hr className="new-hr" />
          <div className="right-bottom">
            <div className="check">
              <label className="checkbox">
                <input type="checkbox" />
              </label>
              <div className="down-arrow">
                <img src="https://i.ibb.co/WDqrXj6/drop-down-arrow.png" />
              </div>
            </div>
            <div className="middle-buttons">
              <div className="buttons">
                <button className="new button">
                  <img src="https://i.ibb.co/X4j3TZR/reload.png" />
                </button>
                <button className="new button">
                  <img src="https://i.ibb.co/L60Yr87/eye.png" />
                </button>
                <button className="new button">
                  <img src="https://i.ibb.co/Lv6TqBG/waste-bin.png" />
                </button>
              </div>
              <div className="form has-search">
                <input
                  className="text"
                  type="search"
                  placeholder="Search here..."
                  name="search"
                />
                <span className="searchIcon">
                  <img src="https://i.ibb.co/sqFgRq8/search.png" />
                </span>
              </div>
            </div>
            <div className="search-arrow">
              <img src="https://i.ibb.co/cx2t05H/scroll-arrows.png" />
            </div>
          </div>
        </div>
        <div className="right-body">
          <div className="scroll-cards">
            <div className="card">
              <div className="mails">
                <img src="https://randomuser.me/api/portraits/men/20.jpg" />
                <div className="mail-names">Alan M.</div>
              </div>
              <div className="mail-info">
                Como realizar bien un proyecto final en 4Geeks
              </div>
              <div></div>
              <div className="bottom-info">
                <div className="check1">
                  <label className="checkbox">
                    <input type="checkbox" />
                  </label>
                  <div className="star">
                    <img src="https://i.ibb.co/SN5SJ8x/star.png" />
                  </div>
                  <div className="star">
                    <img src="https://i.ibb.co/FW9tsHK/attachment.png" />
                  </div>
                </div>
                <div className="date">08:40 PM</div>
              </div>
            </div>
            <div className="card">
              <div className="mails">
              <img src="https://randomuser.me/api/portraits/men/79.jpg" />
                <div className="mail-names">ZAS</div>
              </div>
              <div className="mail-info">Como usar bien Figma</div>
              <div></div>
              <div className="bottom-info">
                <div className="check1">
                  <label className="checkbox">
                    <input type="checkbox" />
                  </label>
                  <div className="star">
                    <img src="https://i.ibb.co/SN5SJ8x/star.png" />
                  </div>
                  <div className="star">
                    <img src="https://i.ibb.co/FW9tsHK/attachment.png" />
                  </div>
                </div>
                <div className="date">8:30 PM</div>
              </div>
            </div>
            <div className="card">
              <div className="mails">
                <span className="person border2">O</span>
                <div className="mail-names">Lorena Guillen</div>
              </div>
              <div className="mail-info">Gestion de JWT</div>
              <div></div>
              <div className="bottom-info">
                <div className="check1">
                  <label className="checkbox">
                    <input type="checkbox" />
                  </label>
                  <div className="star">
                    <img src="https://i.ibb.co/SN5SJ8x/star.png" />
                  </div>
                  <div className="star">
                    <img src="https://i.ibb.co/FW9tsHK/attachment.png" />
                  </div>
                </div>
                <div className="date">8:30 AM</div>
              </div>
            </div>
            <div className="card">
              <div className="mails">
                <span className="person border3">H</span>
                <div className="mail-names">Harry Burton</div>
              </div>
              <div className="mail-info">
                Curso avanzado de Python
              </div>
              <div></div>
              <div className="bottom-info">
                <div className="check1">
                  <label className="checkbox">
                    <input type="checkbox" />
                  </label>
                  <div className="star">
                    <img src="https://i.ibb.co/SN5SJ8x/star.png" />
                  </div>
                  <div className="star">
                    <img src="https://i.ibb.co/FW9tsHK/attachment.png" />
                  </div>
                </div>
                <div className="date">8:30 AM</div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="mes-date">Dec 26, 2024</div>
            <div className="title">
              Como estructurar correctamente un proyecto final de Full Stack Developer
              <div className="title-icons"></div>
            </div>
            <div className="from">
              <span className="who">From: </span>ZASf@4GeeksAcademy.com
            </div>
            <div className="message-from1">
              Hola {empresa}!
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                voluptas pariatur repellat veritatis atque, tempora quasi quas
                facere impedit aliquam libero qui iure cumque incidunt facilis
                soluta necessitatibus laboriosam nemo. Delectus architecto sed,
                excepturi natus iste vel quidem officia corrupti repudiandae!
              </p>
              <p>
                {" "}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Inventore, deleniti eaque eligendi minus maxime tempora eiusi.
              </p>
              <p>Saludos</p>
              <p>ZAS</p>
            </div>
            <div className="attachment-last">
              <img src="https://i.ibb.co/FW9tsHK/attachment.png" />
              <div className="att-write">Attachment (80MB)</div>
              <button className="btn1 buton0">
                {" "}
                View All
                <span className="tag" />
              </button>

              <button className="btn1 buton9"> Download All</button>
            </div>
            <div className="son-images">
              <div className="inside-img">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
                <img src="https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" />
              </div>
              <button className="son-buton"> 20+</button>
            </div>
            <button className="btn2 butona mx-3">
              {" "}
              Reply
              <span className="tag">
                <img src="https://i.ibb.co/GQf8frw/reply.png" />
              </span>
            </button>

            <button className="btn2 butonb">
              {" "}
              Forward
              <span className="tag">
                <img src="https://i.ibb.co/6W40kTg/forward-arrow.png" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboardEmpresa;
