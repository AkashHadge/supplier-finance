package com.hcl.capstoneserver.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.HttpClientErrorException;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserAlreadyExistsException extends HttpClientErrorException {
    public UserAlreadyExistsException(String username) {
        super(String.format("User with username %s already exits.", username), HttpStatus.BAD_REQUEST, "Username", null, null, null);
    }
}
