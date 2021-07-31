intent("(Let's|I want to) play!", p => {
    p.play('Sure!', 'Alright!', 'Here we go!');
    p.play('You can choose to hit by saying hit, or to stand by saying stand. To reset the game say deal, and say pause if you would like to pause the game. You can also click the buttons if you would like.');
    
});

onUserEvent((p, e) => {
    if (e.event == 'micPermissionPrompt') {
        p.showPopup({
            html: '<div class="info-popup"> <div class="info-popup_header"></div><div class="info-popup_body"> <div>Click <b>Allow microphone</b> to talk to me</div>',
            style: ".info-popup{max-width:394px;height:250px;max-height:250px;background:#fff;-webkit-box-shadow:0 5px 14px rgba(0,0,0,.25);box-shadow:0 5px 14px rgba(0,0,0,.25);overflow:hidden;border-radius:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.top .info-popup{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse}.top .info-popup_body{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;padding-top:20px}.info-popup_header{height:191px;background-image:url(https://alan.app/assets/script-concepts/popup-image.png);background-repeat:no-repeat;background-position:center center;background-size:100% 100%}.info-popup_body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-weight:400;font-size:16px;line-height:28px;text-align:left;color:#000;padding:6px 70px 0;max-width:350px;height:70px}",
            overlay: true,
            buttonMarginInPopup: 10,
            force: false,
        });
        p.play('Hi, this is Alan, your voice assistant!');
        p.play("To play Blackjack with me, click Allow microphone and please say: I want to play, or Let's Play!");
    }
});

intent('(I want to hit.|) (Hit.|)', p => {
    p.play('No problem!', 'Sure!', 'Alright!');
    let yourCommand = p.COMMAND;
    p.play({command: 'userHit', item: p.COMMAND});
});

intent('(I want to stand.|) (Stand.|)', p => {
    p.play('No problem! My turn.', "Sure! Now it's my turn!", 'Alright! My turn.');
    let yourCommand = p.COMMAND;
    p.play({command: 'userStand', item: p.COMMAND});
});

intent('(I want to deal.|New game.) (Deal.|)', p => {
    p.play('No problem!', 'Sure!', 'Alright!');
    let yourCommand = p.COMMAND;
    p.play({command: 'userDeal', item: p.COMMAND});
})

intent('(I want to pause.|) (Pause.|)', p => {
    p.play('No problem!', "Sure!", 'Alright');
    let yourCommand = p.COMMAND;
    p.play({command: 'userPause', item: p.COMMAND});
});

intent('(I want to resume.|) (Resume.|)', p => {
    p.play('No problem!', "Sure!", 'Alright');
    let yourCommand = p.COMMAND;
    p.play({command: 'userResume', item: p.COMMAND});
});

intent('(I want to reset.|) (Reset.|)', p => {
    p.play('No problem!', "Sure!", 'Alright');
    let yourCommand = p.COMMAND;
    p.play({command: 'userReload', item: p.COMMAND});
});
