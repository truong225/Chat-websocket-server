package com.ifi.chat.stomp.controller;

import com.ifi.chat.entity.User;
import com.ifi.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    String username = "";

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String helloPage(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@ModelAttribute User user, Model model) {
        model.addAttribute("user", user);
        User userLogin = userService.getUser(user.getUsername(), user.getPassword());
        if (userLogin == null) {
            model.addAttribute("err", "Username or password is wrong");
            return "login";
        } else {
            this.username = userLogin.getUsername();
            return "redirect:/chat";
        }
    }

    @RequestMapping(value = "/chat")
    public String chat(Model model) {
        if (this.username != "") {
            model.addAttribute("username", this.username);
            this.username = "";
            return "chat";
        } else
            model.addAttribute("user", new User());
        return "login";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String signupForm(Model model) {
        model.addAttribute("user", new User());
        return "signup";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String signup(@ModelAttribute User user, Model model) {
        String err = "";
        User userSignup = userService.getUserByName(user.getUsername());

        if (userSignup == null)
            userService.addUser(user.getUsername(), user.getPassword());
        else
            err = "Account exists";

        model.addAttribute("user", new User());
        model.addAttribute("err", err);
        return "login";
    }
}