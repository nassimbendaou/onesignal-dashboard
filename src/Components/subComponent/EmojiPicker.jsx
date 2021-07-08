

 import React from 'react';
 import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
 import Typography from '@material-ui/core/Typography';
 import Box from '@material-ui/core/Box';
 import Button from '@material-ui/core/Button';
 import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
 import Popover from '@material-ui/core/Popover';
 import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

     const Emojis = (props) => {
        const [chosenEmoji, setChosenEmoji] = React.useState(null);
      
        const onEmojiClick = (event, emojiObject) => {
          setChosenEmoji(emojiObject);
          document.getElementById(props.parent).value = document.getElementById(props.parent).value + emojiObject.emoji
         props.Change({target:{value: document.getElementById(props.parent).value}})
        };
      
        return (
          <div >
            <Picker
             
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
            
          </div>
        );
      };
 export default function EmojiPicker(props) {

   return (
     <PopupState variant="popover" popupId="demo-popup-popover">
       {(popupState) => (
         <div>
           <button variant="contained" color="inherit" {...bindTrigger(popupState)} style={{marginTop:30,marginLeft:-10,backgroundColor:"#f8f9fa",border:0}}>
           <InsertEmoticonIcon color="primary"/>
           </button>
           <Popover
             {...bindPopover(popupState)}
             anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
             }}
             transformOrigin={{
               vertical: 'top',
               horizontal: 'center',
             }}
           >
             <Box p={2}>
             <Emojis parent={props.parent} Change={props.onChange} />
             </Box>
           </Popover>
         </div>
       )}
     </PopupState>
   );
 }
 

 




