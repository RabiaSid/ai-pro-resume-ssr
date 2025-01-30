import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LiaSpellCheckSolid, LiaTimesSolid } from "react-icons/lia";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { ApiService } from "../../../services/ApiService";
import { RiLoader3Fill } from "react-icons/ri";
import { useAuth } from "../../../services/Auth";
import {
  Autocomplete,
  createFilterOptions,
  TextField,
  Tooltip,
} from "@mui/material";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { minus_icon, plus_Icon, trash } from "../../../icons/svgs";
import { BsStars } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "100%",
    md: "960px",
    lg: "1240px",
  },
  height: {
    xs: "100%",
    sm: "80%",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: {
    xs: "0px",
    sm: "20px",
  },
  background: "white",
};

const modalStyles = {
  outline: "none",
};

const AiModal = ({
  open,
  handleClose,
  suggestionsList,
  handleSave,
  modalType,
  initialContent,
  maxLength,
  searcher = "",
}) => {
  const editorRef = useRef(null);
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [spellIsLoading, setSpellIsLoading] = useState(false);
  const [grammarIsLoading, setGrammarIsLoading] = useState(false);
  const [userSpellCounts, setUserSpellCounts] = useState(0);
  const [allJobPositionList, setAllJobPositionsList] = useState([]);
  const [selectedJobPosition, setselectedJobPosition] = useState("");
  const [SuggestionsValuesList, setSuggestionValuesList] = useState([]);
  const [similar_names, setSimilar_names] = useState([]);
  const [charCounts, setCharCount] = useState(0);
  const [addedSuggestionIds, setAddedSuggestionIds] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [suggestionOnLoading, setSuggestionOnLoading] = useState(false);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  useEffect(() => {
    if (content) {
      const plainText = content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\n/g, "")
        .replace(/\s+/g, " ");

      setCharCount(plainText.length);
    }
  }, [content]);

  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
    sunEditor.core.context.element.wysiwyg.setAttribute("spellcheck", "false");
  };

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
      if (editorRef && editorRef.current) {
        editorRef.current.setContents(initialContent);
      }
    }
  }, [initialContent]);

  useEffect(() => {
    setSuggestionValuesList(suggestionsList);
  }, [suggestionsList]);

  useEffect(() => {
    if (modalType.includes("Suggestions")) {
      ApiService.getAllJobPositions(user?.token)
        .then((res) => {
          setAllJobPositionsList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    userDetailsLoadData();
  }, [user]);

  const userDetailsLoadData = () => {
    if (user?.token) {
      ApiService.getUserDetails(user?.token)
        .then((res) => {
          const { spell_and_grammer_tries } = res.data;
          setUserSpellCounts(spell_and_grammer_tries);
        })
        .catch((err) => console.log(err));
    }
  };

  const sugDriver = driver({
    overlayColor: "transparent",
    popoverClass: "sugesstion-popover",
  });

  const getPlainText = (html) => {
    const tempDiv = document.createElement("div");
    let processedHtml = html.replace(/<br\s*\/?>(?!<\/span>)/gi, " ");
    processedHtml = processedHtml.replace(
      /<\/(p|div|h[1-6]|li|section|article)>/gi,
      " </$1>"
    );
    tempDiv.innerHTML = processedHtml;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const underlineErrors = (foundErrors) => {
    if (!editorRef.current) return;

    let updatedContent = content;
    let currentIndex = 0;

    foundErrors.forEach((error) => {
      if (error?.recommendedWords.length === 0) return;

      // Regex to match the word either in plain text or inside tags
      const regex = new RegExp(
        `(<[^>]*>)?(${error.misspelledWord})(?![^<]*<\/span>)`,
        "gi"
      );

      updatedContent = updatedContent.replace(regex, (match, tag, word) => {
        const uniqueId = `error_${currentIndex}`;
        currentIndex++;
        return tag
          ? `${tag}<span class="${uniqueId}" style="text-decoration: underline; color: red; position: relative; cursor: pointer;" id="${uniqueId}" data-correction="spell" data-suggestions="${error.recommendedWords.join(
              ", "
            )}">${word}</span>`
          : `<span class="${uniqueId}" style="text-decoration: underline; color: red; position: relative; cursor: pointer;" id="${uniqueId}" data-correction="spell" data-suggestions="${error.recommendedWords.join(
              ", "
            )}">${word}</span>`;
      });
    });

    editorRef.current.setContents(updatedContent);
    setContent(updatedContent);
  };

  const checkSpelling = () => {
    const plainText = getPlainText(content);
    if (userSpellCounts > 0) {
      if (!plainText || plainText.trim().length === 0) return;
      setSpellIsLoading(true);
      ApiService.aiSpell_Check(plainText).then((res) => {
        setUserSpellCounts((prevCount) => prevCount - 1);
        ApiService.updateParserTries(user?.token, "1", "spell")
          .then((res) => {
            ApiService.getUserDetails(user?.token)
              .then((res) => {
                const { spell_and_grammer_tries } = res.data;
                setUserSpellCounts(spell_and_grammer_tries);
                setSpellIsLoading(false);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        if (res.data.data?.length === 0) {
          toast.success("No Spell Mistakes were Found");
        } else {
          const foundErrors = res.data.data.filter(({ misspelledWord }) =>
            new RegExp(`\\b(${misspelledWord})\\b`, "gi").test(plainText)
          );

          setErrors(foundErrors);
          underlineErrors(foundErrors);
        }
      });
    }
  };

  useEffect(() => {
    // Spell checker
    window.handleSuggestionClick = handleSuggestionClick;
    window.handleIgnore = handleIgnore;
    window.handleAcceptAll = handleAcceptAll;

    window.handleIgnoreAll = handleIgnoreAll;
    // Grammer
    window.handleGrammarSuggestionClick = handleGrammarSuggestionClick;

    return () => {
      // Spell events end
      delete window.handleSuggestionClick;
      delete window.handleIgnore;
      delete window.handleAcceptAll;

      delete window.handleIgnoreAll;
      // Grammer events end
      delete window.handleGrammarSuggestionClick;
    };
  }, []);

  const escapeApostrophe = (str) => str.replace(/'/g, "\\'");

  const handleMouseOver = (e) => {
    if (e.target.tagName === "SPAN" && e.target.dataset.suggestions) {
      let customHTML = "";
      const corrections = e.target.dataset.correction;

      const suggestions = e.target.dataset.suggestions.split(", ");

      const suggestionButtons = suggestions
        .map(
          (s) =>
            `<button onclick="handleSuggestionClick('${escapeApostrophe(s)}','${
              e.target.id
            }')"
          class="text-lg font-bold hover:bg-gray-100 w-full  text-left px-2 py-2.5"
          >
          ${s}
         </button>`
        )
        .join("");

      customHTML = `
        <div id="driver-popover-content">
          <div class="text-primary-green max-h-[100px] overflow-y-scroll">${suggestionButtons}</div>
          <div class="flex flex-col gap-2 items-start justify-start">
          
           <div class="flex flex-col gap-2 py-4 border-y-2 w-full">
              <button  onclick="handleIgnore('${
                e.target.id
              }')" class="text-lg flex items-center gap-4 text-primary-gray">
                ${trash({ w: 20, h: 20 })}
                <span>Ignore</span>
              </button>
            
              <button onclick="handleIgnoreAll()" class="text-lg  flex items-center gap-4 text-primary-gray"> 
              ${trash({ w: 20, h: 20 })}
                <span>Ignore All</span>
              </button>
           </div>
            <button onclick="handleAcceptAll()" class="text-lg bg-primary-green text-white px-4 py-1 rounded-full">Accept All</button>
          </div>
        </div>
      `;

      sugDriver.highlight({
        element: e.target,
        popover: {
          title: "Related Suggestions",
          description: customHTML,
          side: "bottom",
          align: "center",
        },
      });
    }
  };
  // grammer
  const checkGrammar = () => {
    if (!content) return;
    setGrammarIsLoading(true);
    const plainText = getPlainText(content);

    ApiService.aiGrammer_Check(plainText).then((res) => {
      ApiService.updateParserTries(user?.token, "1", "spell")
        .then((res) => {
          ApiService.getUserDetails(user?.token)
            .then((res) => {
              const { spell_and_grammer_tries } = res.data;
              setUserSpellCounts(spell_and_grammer_tries);
              setGrammarIsLoading(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      if (res.data.data.length === 0) {
        toast.success("No Grammar Mistakes were Found");
      } else {
        underlineGrammarMistakes(res.data.data);
      }
    });
  };

  const underlineGrammarMistakes = (mistakes) => {
    if (!editorRef.current) return;

    let updatedContent = content;
    let currentIndex = 0;

    mistakes.forEach((mistake) => {
      const { wrongWords, recommendedWord } = mistake;

      if (!recommendedWord || recommendedWord.length === 0) return;

      const uniqueId = `error_${currentIndex}`;
      currentIndex++;

      // Regex to match the wrong word in the content
      const regex = new RegExp(`\\b${wrongWords}\\b`, "gi");

      updatedContent = updatedContent.replace(
        regex,
        `<span class="${uniqueId}" style="text-decoration: underline; color: blue; position: relative; cursor: pointer;" id="${uniqueId}" data-correction="grammar" data-suggestions="${recommendedWord.join(
          ", "
        )}">${wrongWords}</span>`
      );
    });

    editorRef.current.setContents(updatedContent);
    setContent(updatedContent);
  };

  const handleGrammarSuggestionClick = (suggestions, id) => {
    if (!id || !editorRef.current) return;

    const targetElement = editorRef.current
      .getContents()
      .querySelector(`#${id}`);

    if (targetElement) {
      targetElement.textContent = suggestions;
      targetElement.removeAttribute("style");
      targetElement.removeAttribute("data-correction");
      targetElement.removeAttribute("data-suggestions");
      targetElement.classList.remove("grammar_error");
    }

    setContent(editorRef.current.getContents().innerHTML);
    sugDriver.destroy();
  };

  const handleMouseLeave = (e) => {
    if (e.target.tagName !== "SPAN") {
      setTimeout(() => {
        // sugDriver.destroy();
      }, 200);
    }
  };

  const handleSuggestionClick = (suggestion, id) => {
    if (!id || !editorRef.current) return;

    const currentContent = editorRef.current.getContents();

    const regex = new RegExp(`<span[^>]*id="${id}"[^>]*>(.*?)<\/span>`, "gi");

    const updatedContent = currentContent.replace(regex, suggestion);

    setContent(updatedContent);
    if (editorRef && editorRef.current) {
      editorRef.current.setContents(updatedContent);
    }
    sugDriver.destroy();
  };

  const handleIgnore = (error_id) => {
    if (!error_id || !editorRef.current) return;

    let EditorContent = editorRef.current.getContents();

    const regex = new RegExp(
      `<span[^>]*id="${error_id}"[^>]*>(.*?)<\/span>`,
      "gi"
    );

    const updatedContent = EditorContent.replace(regex, "$1");

    setContent(updatedContent);
    editorRef.current.setContents(updatedContent);

    setErrors((prevErrors) =>
      prevErrors.filter((error) => error.id !== error_id)
    );

    sugDriver.destroy();
  };

  const handleIgnoreAll = () => {
    if (!editorRef.current) return;

    let currentContent = editorRef.current.getContents();

    const regex = /<span[^>]*id="error_\d+"[^>]*>(.*?)<\/span>/gi;

    const updatedContent = currentContent.replace(regex, "$1");

    setContent(updatedContent);
    editorRef.current.setContents(updatedContent);

    sugDriver.destroy();
  };

  const handleAcceptAll = () => {
    if (!editorRef.current) return;

    let currentContent = editorRef.current.getContents();

    const regex =
      /<span[^>]*id="error_\d+"[^>]*data-suggestions="([^"]*)">([^<]*)<\/span>/gi;

    currentContent = currentContent.replace(
      regex,
      (match, suggestions, wrongWord) => {
        const suggestionList = suggestions.split(",");

        if (suggestionList.length > 0 && suggestionList[0]) {
          return suggestionList[0];
        } else {
          return match.replace(/<span[^>]*>/, "").replace(/<\/span>/, ""); // Remove span but keep the word
        }
      }
    );

    setContent(currentContent);
    editorRef.current.setContents(currentContent);
    sugDriver.destroy();
  };

  const handleAddTextIntoEditor = (suggestion, id) => {
    if (!editorRef.current) return;
    let editorInstance = editorRef.current.getContents();

    if (editorInstance.trim() === "<p><br></p>") {
      editorInstance = "";
    }

    if (editorInstance.length <= maxLength) {
      if (addedSuggestionIds.includes(id)) {
        const updatedContent = editorInstance.replace(suggestion, "");
        setContent(updatedContent);
        editorRef.current.setContents(updatedContent);
        setAddedSuggestionIds((prev) =>
          prev.filter((suggestionId) => suggestionId !== id)
        );
      } else {
        const reamingCount = getRemingCounts(editorInstance.length, maxLength);
        if (reamingCount >= suggestion.length) {
          const updatedContent = editorInstance + suggestion;
          setContent(updatedContent);
          editorRef.current.setContents(updatedContent);
          setAddedSuggestionIds((prev) => [...prev, id]);
        }
      }
    }
  };

  const changeSuggestionOnJobChange = (job_position) => {
    if (job_position) {
      setselectedJobPosition(job_position);
      setSuggestionOnLoading(true);
      setAddedSuggestionIds([]);
      if (searcher === "spell") {
        ApiService.showSummariesSuggestionsWithJobPosioton(
          user?.token,
          job_position
        )
          .then((res) => {
            setSuggestionValuesList([]);
            setSimilar_names([]);

            const selectedJob = allJobPositionList.find(
              (job) => job.name === job_position
            );

            const similarNamesArray = selectedJob?.similar_names
              ? selectedJob.similar_names.split(",").map((name) => name.trim())
              : [];

            if (res.data.data.summary_suggestions?.length === 0) {
              ApiService.aiSummaryGen(selectedJob.name, similarNamesArray)
                .then((res) => {
                  res.data.data.summary?.map((sug, idx) =>
                    setSuggestionValuesList((prev) => [
                      ...prev,
                      { id: idx, suggestion: sug },
                    ])
                  );
                  setSuggestionOnLoading(false);
                  if (res.data.data?.summary?.length > 0) {
                    ApiService.createObjective(
                      user?.token,
                      res.data.data.summary,
                      selectedJob?.id
                    )
                      .then((res) => "")
                      .catch((err) => console.log(err));
                  }
                })
                .catch((err) => console.log(err));
            } else {
              setSimilar_names(similarNamesArray);
              res.data.data.summary_suggestions?.map((sug) =>
                setSuggestionValuesList((prev) => [
                  ...prev,
                  { id: sug?.pivot?.objective_id, suggestion: sug?.detail },
                ])
              );
              setSuggestionOnLoading(false);
            }
          })
          .catch((err) => console.log(err));
      } else if (searcher === "exp") {
        ApiService.exprinceSuggestionRelatedJobPosition(
          user?.token,
          job_position
        )
          .then((res) => {
            const selectedJob = allJobPositionList.find(
              (job) => job.name === job_position
            );
            if (res.data.data.experience_suggestions.length === 0) {
              const ai_subData = {
                job_title: selectedJob.name,
              };

              ApiService.createJobDescriptionSuggestion(user?.token, ai_subData)
                .then((res) => {
                  res.data.data.summary?.map((sug, idx) =>
                    setSuggestionValuesList((prev) => [
                      ...prev,
                      { id: idx, suggestion: sug },
                    ])
                  );
                  setSuggestionOnLoading(false);
                  if (res.data.data.summary.length > 0) {
                    const ai_subData = {
                      detail: res.data.data.summary,
                      job_position_ids: selectedJob.id,
                    };

                    ApiService.createExperenceSuggestion(
                      user?.token,
                      ai_subData
                    )
                      .then((res) => console.log("recored added", res))
                      .catch((err) => console.log(err));
                  }
                })
                .catch((err) => console.log(err));
            } else {
              res.data.data.experience_suggestions?.forEach((sug) => {
                setSuggestionValuesList((prev) => {
                  const alreadyExists = prev.some((item) => item.id === sug.id);
                  if (!alreadyExists) {
                    return [...prev, { id: sug.id, suggestion: sug.detail }];
                  }
                  return prev;
                });
              });
              setSuggestionOnLoading(false);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleSendDataBack = (content) => {
    if (!editorRef.current) return;

    const regex =
      /<span[^>]*style=["']?[^"'>]*color:\s?red[^"'>]*["']?[^>]*>(.*?)<\/span>/gi;

    const cleanValue = content.replace(regex, "$1");

    handleSave(cleanValue);
  };

  // tool bar
  const customToolbar = [
    ["undo", "redo"],
    ["bold", "italic", "underline"],
  ];

  const planString = (html) => {
    const plainText = html
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\n/g, "")
      .replace(/\s+/g, " ");
    return plainText;
  };

  const getRemingCounts = (totalContent, maxAllowed) => {
    const reminingAllowed = maxAllowed - totalContent;
    return reminingAllowed;
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyles}
      >
        <Box sx={boxStyle} className="flex flex-col">
          <Typography
            id="modal-modal-title"
            className="border-b w-full py-4 h-[80px]"
          >
            <div className="relative flex justify-center items-center">
              <h3 className="font-bold text-2xl">AI Optimizer</h3>
              <div
                className="absolute right-4 cursor-pointer"
                onClick={handleClose}
              >
                <LiaTimesSolid size={30} />
              </div>
            </div>
          </Typography>

          <Typography
            id="modal-modal-description"
            width={"100%"}
            className="flex-1  h-[70%] sm:h-[inherit]"
          >
            <div
              className={`${
                modalType.includes("Suggestions")
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1"
              }  grid py-4 px-2 md:px-8 h-full overflow-y-scroll`}
            >
              <div
                className={`${
                  modalType.includes("Suggestions")
                    ? "md:border-r pr-0 md:pr-8"
                    : ""
                } relative h-auto`}
              >
                <div className="flex flex-col">
                  <div className="h-[1px] w-full"></div>
                  <div
                    id="editor-container"
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex-1"
                  >
                    <SunEditor
                      getSunEditorInstance={getSunEditorInstance}
                      setContents={content}
                      onChange={(newContent) => {
                        const plainText = newContent
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .replace(/\n/g, "")
                          .replace(/\s+/g, " ");

                        if (plainText.length <= Number(maxLength)) {
                          setContent(newContent);
                        }
                      }}
                      setOptions={{
                        maxCharCount: maxLength,
                        charCounter: true,
                        resizeEnable: false,
                        buttonList: customToolbar,
                        strictMode: false,
                        addTagsWhitelist: "span",
                        attributesWhitelist: {
                          span: "id|class|style|data-suggestions|data-correction",
                        },
                        height: "400px",
                        // plugins: [blockquote],
                      }}
                      setDefaultStyle="font-size: 18px; height: 100%"
                      placeholder="Type Here...."
                    />
                    {errMessage && (
                      <>
                        <span className="text-red-500 font-semibold ml-4">
                          {errMessage}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="h-[60px]">
                    <div className="flex justify-end items-center gap-2 h-full">
                      <div>
                        <button
                          className={`${
                            grammarIsLoading
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-primary-blue"
                          }  text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold`}
                          onClick={checkGrammar}
                          disabled={grammarIsLoading}
                        >
                          {grammarIsLoading ? (
                            <>
                              <p className="flex items-center ">
                                <span className="hidden sm:block">Loading</span>
                                <RiLoader3Fill className="animate-spin text-2xl" />
                              </p>
                            </>
                          ) : (
                            <>
                              <BsStars size={20} />
                              AI Grammar
                            </>
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <Tooltip
                          title={`${
                            userSpellCounts > 0
                              ? `You have ${userSpellCounts} Spell tries Left`
                              : `no tries left. Please upgrade to Most Popular or Premium for more spell check`
                          }`}
                          arrow
                          placement="top"
                        >
                          {/* counts */}
                          {/* <div className="bg-yellow-300 text-white w-[30px] h-[30px] shadow-md rounded-full absolute top-[-10px] right-[-10px] flex justify-center items-center z-[2]">
                            {userSpellCounts}
                          </div> */}
                          <button
                            onClick={checkSpelling}
                            className={`${
                              userSpellCounts === 0
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-primary-green animate-pulse"
                            }  px-4 py-2 rounded-lg  text-white font-bold`}
                            disabled={spellIsLoading || userSpellCounts === 0}
                          >
                            {!spellIsLoading ? (
                              <>
                                <span className="hidden lg:flex items-center gap-1">
                                  <IoMdCheckmarkCircleOutline className="text-2xl" />{" "}
                                  Ai Spell
                                </span>
                                <span className="block lg:hidden">
                                  <LiaSpellCheckSolid className="text-2xl" />
                                </span>
                              </>
                            ) : (
                              <p className="flex items-center ">
                                <span className="hidden sm:block">Loading</span>
                                <RiLoader3Fill className="animate-spin text-2xl" />
                              </p>
                            )}
                          </button>
                        </Tooltip>
                      </div>
                      <Tooltip
                        title={`${
                          userSpellCounts > 0
                            ? `You have ${userSpellCounts} Spell tries Left`
                            : `no tries left. Please upgrade to Most Popular or Premium for more spell check`
                        }`}
                        arrow
                        placement="top"
                      >
                        <div className="bg-primary-blue text-white text-sm rounded-md sm:rounded-full px-2 py-2  font-bold flex items-center gap-0.5 sm:gap-2">
                          <div className="text-sm  text-white flex items-center">
                            <span className="hidden sm:block text-sm me-1">
                              {userSpellCounts > 1 ? "Tries:" : "Try:"}{" "}
                            </span>
                            {userSpellCounts > 0 ? userSpellCounts : 0}{" "}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="absolute top-6 right-[55px] z-10">
                  <span>{`${charCounts}/${maxLength}`}</span>
                </div>
              </div>
              {modalType.includes("Suggestions") && (
                <div className="h-full sm:overflow-hidden">
                  {/* suggestions */}
                  <div className="relative overflow-hidden h-full flex flex-col">
                    {/* title section */}
                    <div className="w-full md:px-8 bg-white h-fit">
                      <div className="flex items-center justify-start gap-4 py-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={30}
                            height={30}
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M27.95 5.9C27.6715 5.9 27.4044 5.78938 27.2075 5.59246C27.0106 5.39555 26.9 5.12848 26.9 4.85C26.9 4.57152 27.0106 4.30445 27.2075 4.10754C27.4044 3.91062 27.6715 3.8 27.95 3.8C28.2285 3.8 28.4955 3.91062 28.6925 4.10754C28.8894 4.30445 29 4.57152 29 4.85C29 5.12848 28.8894 5.39555 28.6925 5.59246C28.4955 5.78938 28.2285 5.9 27.95 5.9ZM27.95 5.9V11.15C27.95 12.1272 27.95 12.6158 27.8296 13.012C27.6961 13.4528 27.456 13.8538 27.1304 14.1796C26.8049 14.5053 26.4041 14.7458 25.9634 14.8796C25.5658 15 25.0772 15 24.1 15M2.05 24.1C2.32848 24.1 2.59555 24.2106 2.79246 24.4075C2.98938 24.6044 3.1 24.8715 3.1 25.15C3.1 25.4285 2.98938 25.6955 2.79246 25.8925C2.59555 26.0894 2.32848 26.2 2.05 26.2C1.77152 26.2 1.50445 26.0894 1.30754 25.8925C1.11062 25.6955 1 25.4285 1 25.15C1 24.8715 1.11062 24.6044 1.30754 24.4075C1.50445 24.2106 1.77152 24.1 2.05 24.1ZM2.05 24.1V18.85C2.05 17.8728 2.05 17.3842 2.1704 16.988C2.30389 16.5472 2.54403 16.1462 2.86956 15.8204C3.19508 15.4947 3.59594 15.2542 4.0366 15.1204C4.4342 15 4.9228 15 5.9 15M5.9 2.05C5.9 2.32848 5.78938 2.59555 5.59246 2.79246C5.39555 2.98938 5.12848 3.1 4.85 3.1C4.57152 3.1 4.30445 2.98938 4.10754 2.79246C3.91062 2.59555 3.8 2.32848 3.8 2.05C3.8 1.77152 3.91062 1.50445 4.10754 1.30754C4.30445 1.11062 4.57152 1 4.85 1C5.12848 1 5.39555 1.11062 5.59246 1.30754C5.78938 1.50445 5.9 1.77152 5.9 2.05ZM5.9 2.05H11.15C12.1272 2.05 12.6158 2.05 13.012 2.1704C13.4528 2.30389 13.8538 2.54403 14.1796 2.86956C14.5053 3.19508 14.7458 3.59594 14.8796 4.0366C15 4.4342 15 4.9228 15 5.9M24.1 27.95C24.1 27.6715 24.2106 27.4044 24.4075 27.2075C24.6044 27.0106 24.8715 26.9 25.15 26.9C25.4285 26.9 25.6955 27.0106 25.8925 27.2075C26.0894 27.4044 26.2 27.6715 26.2 27.95C26.2 28.2285 26.0894 28.4955 25.8925 28.6925C25.6955 28.8894 25.4285 29 25.15 29C24.8715 29 24.6044 28.8894 24.4075 28.6925C24.2106 28.4955 24.1 28.2285 24.1 27.95ZM24.1 27.95H18.85C17.8728 27.95 17.3842 27.95 16.988 27.8296C16.5472 27.6961 16.1462 27.456 15.8204 27.1304C15.4947 26.8049 15.2542 26.4041 15.1204 25.9634C15 25.5658 15 25.0772 15 24.1"
                              stroke="#19B2A6"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.96777 14.9316C5.96777 10.642 5.96777 8.4972 7.30057 7.1644C8.63337 5.8316 10.7782 5.8316 15.0678 5.8316C19.3574 5.8316 21.5022 5.8316 22.835 7.1644C24.1678 8.4972 24.1678 10.642 24.1678 14.9316C24.1678 19.2212 24.1678 21.366 22.835 22.6988C21.5022 24.0316 19.3574 24.0316 15.0678 24.0316C10.7782 24.0316 8.63337 24.0316 7.30057 22.6988C5.96777 21.366 5.96777 19.2212 5.96777 14.9316Z"
                              stroke="#19B2A6"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.6978 18.5002L13.6538 12.1708C13.5829 11.9711 13.4508 11.7988 13.2764 11.6784C13.102 11.558 12.8941 11.4957 12.6822 11.5002C12.4705 11.496 12.2629 11.5585 12.0888 11.6788C11.9146 11.7992 11.7828 11.9713 11.712 12.1708L9.66797 18.5002M19.1978 11.5002V18.5002M10.4198 16.4002H14.9446"
                              stroke="#19B2A6"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h5 className="text-primary-green font-[600] text-2xl">
                          AI Suggestions
                        </h5>
                      </div>
                      <div>
                        <div>
                          {searcher ? (
                            <Autocomplete
                              freeSolo
                              options={allJobPositionList
                                ?.sort((a, b) => a.name.localeCompare(b.name))
                                .map((option) => option.name)}
                              filterOptions={filterOptions}
                              onChange={(e, value) => {
                                changeSuggestionOnJobChange(value);
                              }}
                              // onInputChange={(e, value) => {}}
                              sx={{ width: "100%" }}
                              defaultValue={null}
                              value={selectedJobPosition}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  defaultValue={""}
                                  label="Position/Job Title For Suggestions"
                                />
                              )}
                            />
                          ) : (
                            <></>
                          )}
                          {/* <div className="">
                            <div className="flex gap-x-2 gap-y-1 pt-2 flex-wrap w-full ">
                              {similar_names?.map((name, idx) => (
                                <span
                                  className="border rounded-lg bg-primary-green text-white shadow-lg cursor-pointer px-2 py-0.5 w-fit"
                                  key={idx}
                                  onClick={() =>
                                    changeSuggestionOnJobChange(name)
                                  }
                                >
                                  {name}
                                </span>
                              ))}
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 md:overflow-y-scroll">
                      {suggestionOnLoading ? (
                        <div className="flex flex-col gap-4 md:px-6 pb-2 pt-2">
                          <Skeleton className="w-full h-[80px]" />
                          <Skeleton className="w-full h-[80px]" />
                          <Skeleton className="w-full h-[80px]" />
                        </div>
                      ) : (
                        <ul className=" flex  flex-col gap-4 md:px-6 pb-2 pt-2  ">
                          {SuggestionsValuesList?.map((item, idx) => (
                            <li
                              className={`border border-rounded p-2 rounded-md select-none  ${
                                addedSuggestionIds.includes(item.id)
                                  ? "bg-primary-blue text-white"
                                  : "bg-white "
                              }
                            ${
                              planString(editorRef.current.getContents())
                                .length >= Number(maxLength)
                                ? "text-gray-200 cursor-not-allowed"
                                : "cursor-pointer flex gap-2 items-start"
                            }

                            ${
                              getRemingCounts(content.length, maxLength) <=
                              item.suggestion.length
                                ? "text-gray-200 cursor-not-allowed"
                                : "cursor-pointer flex gap-2 items-start"
                            }
                            
                            `}
                              key={idx}
                              onClick={() => {
                                handleAddTextIntoEditor(
                                  item.suggestion,
                                  item.id
                                );
                              }}
                            >
                              {addedSuggestionIds.includes(item.id) ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: minus_icon({
                                      w: 15,
                                      h: 15,
                                      c: "white",
                                    }),
                                  }}
                                />
                              ) : (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: plus_Icon({
                                      w: 15,
                                      h: 15,
                                      c: "#0072b1",
                                    }),
                                  }}
                                />
                              )}
                              {item.suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Typography>

          <Typography
            id="modal-modal-description"
            className="w-full py-4 flex justify-end gap-4 px-4 border-t h-[80px]"
          >
            <button
              className="font-semibold border text-muted px-4 py-1 rounded-full"
              onClick={handleClose}
            >
              Discard
            </button>
            <button
              className="font-semibold border bg-primary-green text-white px-4 py-1 rounded-full"
              onClick={() => {
                const plainText = planString(editorRef.current.getContents());
                if (plainText.length > maxLength) {
                  setErrMessage(`${maxLength} Max length`);
                } else {
                  handleSendDataBack(editorRef.current.getContents());
                  handleClose();
                }
              }}
            >
              Save
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AiModal;
